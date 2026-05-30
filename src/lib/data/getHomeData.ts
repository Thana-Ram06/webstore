import 'server-only'

import { getAdminDb } from '@/lib/firebase/admin'
import { docToCard } from './mappers'
import type { WebAppCardData } from '@/types'

const APPS = 'apps'

export async function getFeaturedApps(count = 5): Promise<WebAppCardData[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .where('isFeatured', '==', true)
    .orderBy('featuredAt', 'desc')
    .limit(count)
    .get()
  return snap.docs.map((d) => docToCard(d.id, d.data()))
}

export async function getTrendingApps(count = 8): Promise<WebAppCardData[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .orderBy('score', 'desc')
    .limit(count)
    .get()
  return snap.docs.map((d) => docToCard(d.id, d.data()))
}

export async function getNewArrivals(count = 6): Promise<WebAppCardData[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .orderBy('createdAt', 'desc')
    .limit(count)
    .get()
  return snap.docs.map((d) => docToCard(d.id, d.data()))
}

// Returns apps in the open-source category, ordered by score.
// Uses the existing (status, categorySlug, score) composite index.
export async function getOpenSourceApps(count = 6): Promise<WebAppCardData[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .where('categorySlug', '==', 'open-source')
    .orderBy('score', 'desc')
    .limit(count)
    .get()
  return snap.docs.map((d) => docToCard(d.id, d.data()))
}

// Returns a map of categorySlug → count of approved apps.
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const { categoryCounts } = await getBrowseFacets()
  return categoryCounts
}

// Returns category and pricing counts for the browse sidebar.
export async function getBrowseFacets(): Promise<{
  categoryCounts: Record<string, number>
  pricingCounts: Record<string, number>
}> {
  const db = getAdminDb()
  const snap = await db
    .collection(APPS)
    .where('status', '==', 'approved')
    .select('categorySlug', 'pricing')
    .get()

  const categoryCounts: Record<string, number> = {}
  const pricingCounts: Record<string, number> = {}

  for (const d of snap.docs) {
    const { categorySlug, pricing } = d.data()
    if (categorySlug) categoryCounts[categorySlug as string] = (categoryCounts[categorySlug as string] ?? 0) + 1
    if (pricing) pricingCounts[pricing as string] = (pricingCounts[pricing as string] ?? 0) + 1
  }

  return { categoryCounts, pricingCounts }
}
