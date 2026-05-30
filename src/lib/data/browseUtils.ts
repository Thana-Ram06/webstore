/**
 * Pure browse utilities — safe to import from both server and client components.
 * Server-only data-fetching lives in getApps.ts.
 */

import type { BrowseFilters } from '@/types/browse'
import type { CategorySlug, PricingModel } from '@/types'
import type { SortOption } from '@/types/browse'

export const PAGE_SIZE = 12

/** Parse and validate raw URL search params into a typed BrowseFilters object. */
export function parseFilters(
  raw: Record<string, string | string[] | undefined>,
): BrowseFilters {
  const str = (key: string) =>
    typeof raw[key] === 'string' ? (raw[key] as string).trim() : undefined

  return {
    q: str('q') || undefined,
    category: str('category') as CategorySlug | undefined,
    pricing: str('pricing') as PricingModel | undefined,
    platform: str('platform') as BrowseFilters['platform'],
    sort: (str('sort') as SortOption) || 'trending',
    featured: raw['featured'] === '1' || raw['featured'] === 'true',
  }
}
