import 'server-only'

import { getAdminDb } from '@/lib/firebase/admin'
import { docToCard, docToDetail, docToReview } from './mappers'
import type { AppDetail, MockReview } from '@/types/detail'
import type { WebAppCardData } from '@/types/card'
import type { CategorySlug } from '@/types/common'

const APPS = 'apps'
const REVIEWS = 'reviews'

/** Returns the approved app matching `slug`, or null if not found / not approved. */
export async function getAppBySlug(slug: string): Promise<AppDetail | null> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('slug', '==', slug)
    .where('status', '==', 'approved')
    .limit(1)
    .get()
  if (snap.empty) return null
  const d = snap.docs[0]
  return docToDetail(d.id, d.data())
}

/**
 * Returns up to 4 approved apps in the same category, ordered by score.
 * Uses the existing (status, categorySlug, score) composite index.
 */
export async function getRelatedApps(
  categorySlug: CategorySlug,
  excludeId: string,
): Promise<WebAppCardData[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .where('categorySlug', '==', categorySlug)
    .orderBy('score', 'desc')
    .limit(5)
    .get()
  return snap.docs
    .filter((d) => d.id !== excludeId)
    .slice(0, 4)
    .map((d) => docToCard(d.id, d.data()))
}

/** Returns up to 3 reviews for the given app, ordered by recency. */
export async function getAppReviews(appId: string): Promise<MockReview[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(REVIEWS)
    .where('appId', '==', appId)
    .orderBy('createdAt', 'desc')
    .limit(3)
    .get()
  return snap.docs.map((d) => docToReview(d.id, d.data()))
}
