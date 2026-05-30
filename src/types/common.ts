export type Timestamp = import('firebase/firestore').Timestamp

export interface TimestampedDoc {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type SortDirection = 'asc' | 'desc'

export interface PaginationOptions {
  limit?: number
  cursor?: unknown
  direction?: SortDirection
}

export interface PaginatedResult<T> {
  items: T[]
  hasMore: boolean
  lastCursor?: unknown
}

export type Platform = 'web' | 'pwa' | 'desktop' | 'extension'
export type PricingModel = 'free' | 'freemium' | 'paid' | 'open-source'
export type AppStatus = 'pending' | 'approved' | 'rejected' | 'deleted'
export type UserRole = 'user' | 'admin'

export type CategorySlug =
  | 'ai-tools'
  | 'productivity'
  | 'developer-tools'
  | 'design-tools'
  | 'marketing'
  | 'finance'
  | 'analytics'
  | 'collaboration'
  | 'no-code'
  | 'education'
  | 'open-source'
  | 'security'
