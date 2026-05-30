import type { CategorySlug, PricingModel, Platform } from './common'
import type { WebAppCardData } from './card'

export type SortOption = 'trending' | 'newest' | 'top-rated' | 'most-favorited'

export interface BrowseFilters {
  q?: string
  category?: CategorySlug
  pricing?: PricingModel
  platform?: Platform
  sort?: SortOption
  featured?: boolean
}

export interface AppQueryResult {
  /** First page of apps (or all if server does not paginate) */
  apps: WebAppCardData[]
  /** Total number of matching apps across all pages */
  totalCount: number
  /** Whether more apps exist beyond those returned */
  hasMore: boolean
  /**
   * Opaque cursor for fetching the next page.
   * Mock: integer offset as string.
   * Firestore: last document ID.
   */
  nextCursor?: string
}
