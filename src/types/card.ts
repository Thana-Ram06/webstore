import type { CategorySlug, PricingModel } from './common'

export interface WebAppCardData {
  id: string
  slug: string
  name: string
  tagline: string
  logoUrl: string
  screenshotUrls: string[]
  websiteUrl: string
  categorySlug: CategorySlug
  pricing: PricingModel
  averageRating: number
  reviewCount: number
  isFeatured?: boolean
}
