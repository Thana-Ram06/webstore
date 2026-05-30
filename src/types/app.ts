import type { TimestampedDoc, Platform, PricingModel, AppStatus, CategorySlug } from './common'

export type { CategorySlug }

export interface AppDoc extends TimestampedDoc {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logoUrl: string
  screenshotUrls: string[]
  websiteUrl: string
  categorySlug: CategorySlug
  tags: string[]
  features?: string[]
  platforms: Platform[]
  pricing: PricingModel
  pricingNote?: string
  status: AppStatus
  submittedBy: string
  reviewedBy?: string
  reviewedAt?: TimestampedDoc['createdAt']
  rejectionReason?: string
  averageRating: number
  reviewCount: number
  favoriteCount: number
  viewCount: number
  score: number
  isFeatured: boolean
  featuredAt?: TimestampedDoc['createdAt']
}

export interface AppSearchRecord {
  objectID: string
  name: string
  tagline: string
  categorySlug: CategorySlug
  tags: string[]
  platforms: Platform[]
  pricing: PricingModel
  averageRating: number
  score: number
  logoUrl: string
}
