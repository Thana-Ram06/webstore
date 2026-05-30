import type { WebAppCardData } from './card'
import type { Platform } from './common'

export interface AppDetail extends WebAppCardData {
  description: string
  features: string[]
  platforms: Platform[]
  pricingNote?: string
  tags: string[]
  favoriteCount: number
  viewCount: number
  addedDate: string // ISO 8601 e.g. "2023-04-12"
}

export interface MockReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number // 1–5
  title: string
  body: string
  date: string // ISO 8601
  helpfulCount: number
  isVerified: boolean
}
