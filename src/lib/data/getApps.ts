import 'server-only'

/**
 * Server-side data-fetching for the browse experience.
 *
 * Sorting is pushed to Firestore (indexed). Equality filters (category, pricing,
 * featured, text search) are applied in JS so the query surface stays small.
 *
 * Firestore pagination path (future):
 *   1. Accept a `cursor` param and pass `startAfter(lastDoc)`.
 *   2. Return `nextCursor` as the last document ID.
 *   3. Merge pages on the client via a /api/apps route.
 */

import { getAdminDb } from '@/lib/firebase/admin'
import { docToCard } from './mappers'
import type { BrowseFilters, AppQueryResult, SortOption } from '@/types/browse'

export { PAGE_SIZE, parseFilters } from './browseUtils'

const SORT_FIELD: Record<SortOption, string> = {
  trending: 'score',
  newest: 'createdAt',
  'top-rated': 'averageRating',
  'most-favorited': 'favoriteCount',
}

/** Return the display-ordered apps that match the given filters. */
export async function getApps(filters: BrowseFilters): Promise<AppQueryResult> {
  const db = getAdminDb()

  // Fetch up to 200 approved apps ordered by the requested sort field.
  // Category / pricing / featured / text filters are applied in JS below.
  const sortField = SORT_FIELD[filters.sort ?? 'trending'] ?? 'score'
  const snap = await db
    .collection('apps')
    .where('status', '==', 'approved')
    .orderBy(sortField, 'desc')
    .limit(200)
    .get()

  let results = snap.docs.map((d) => docToCard(d.id, d.data()))

  // ── Text search ────────────────────────────────────────────────
  if (filters.q) {
    const q = filters.q.toLowerCase()
    results = results.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q),
    )
  }

  // ── Category ───────────────────────────────────────────────────
  if (filters.category) {
    results = results.filter((app) => app.categorySlug === filters.category)
  }

  // ── Pricing ────────────────────────────────────────────────────
  if (filters.pricing) {
    results = results.filter((app) => app.pricing === filters.pricing)
  }

  // ── Platform ──────────────────────────────────────────────────
  // Stored on AppDoc but not on WebAppCardData; push to Firestore when indexes exist.

  // ── Featured ───────────────────────────────────────────────────
  if (filters.featured) {
    results = results.filter((app) => app.isFeatured)
  }

  return {
    apps: results,
    totalCount: results.length,
    hasMore: false,
    nextCursor: undefined,
  }
}
