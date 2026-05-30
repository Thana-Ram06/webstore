import type { BrowseFilters } from '@/types/browse'

/** Builds the canonical `/apps?...` URL for a given filter state. */
export function buildBrowseUrl(filters: BrowseFilters): string {
  const params = new URLSearchParams()
  if (filters.q) params.set('q', filters.q)
  if (filters.category) params.set('category', filters.category)
  if (filters.pricing) params.set('pricing', filters.pricing)
  if (filters.platform) params.set('platform', filters.platform)
  if (filters.sort && filters.sort !== 'trending') params.set('sort', filters.sort)
  if (filters.featured) params.set('featured', '1')
  const qs = params.toString()
  return qs ? `/apps?${qs}` : '/apps'
}

/** Returns the number of active filter dimensions (excludes sort and q). */
export function countActiveFilters(filters: BrowseFilters): number {
  return (
    (filters.category ? 1 : 0) +
    (filters.pricing ? 1 : 0) +
    (filters.platform ? 1 : 0) +
    (filters.featured ? 1 : 0)
  )
}
