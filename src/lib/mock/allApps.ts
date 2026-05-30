import type { WebAppCardData } from '@/types'
import { featuredApps } from './featuredApps'
import { trendingApps } from './trendingApps'
import { newArrivals } from './newArrivals'
import { openSourceApps } from './openSourceApps'

/** Deduplicated union of all mock app datasets, preserving display priority order. */
const seen = new Set<string>()
export const allApps: WebAppCardData[] = [
  ...featuredApps,
  ...trendingApps,
  ...newArrivals,
  ...openSourceApps,
].filter((app) => {
  if (seen.has(app.id)) return false
  seen.add(app.id)
  return true
})

/** Per-category count across all mock apps. */
export const CATEGORY_COUNTS: Record<string, number> = {}
/** Per-pricing count across all mock apps. */
export const PRICING_COUNTS: Record<string, number> = {}

for (const app of allApps) {
  CATEGORY_COUNTS[app.categorySlug] = (CATEGORY_COUNTS[app.categorySlug] ?? 0) + 1
  PRICING_COUNTS[app.pricing] = (PRICING_COUNTS[app.pricing] ?? 0) + 1
}
