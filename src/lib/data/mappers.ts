import 'server-only'

import type { DocumentData } from 'firebase-admin/firestore'
import type { WebAppCardData } from '@/types/card'
import type { AppDetail, MockReview } from '@/types/detail'
import type { Platform } from '@/types/common'

export function docToCard(id: string, data: DocumentData): WebAppCardData {
  return {
    id,
    slug: data.slug as string,
    name: data.name as string,
    tagline: data.tagline as string,
    logoUrl: data.logoUrl as string,
    screenshotUrls: (data.screenshotUrls as string[]) ?? [],
    websiteUrl: data.websiteUrl as string,
    categorySlug: data.categorySlug,
    pricing: data.pricing,
    averageRating: (data.averageRating as number) ?? 0,
    reviewCount: (data.reviewCount as number) ?? 0,
    isFeatured: (data.isFeatured as boolean) ?? false,
  }
}

export function docToDetail(id: string, data: DocumentData): AppDetail {
  const createdAt = data.createdAt as { toDate(): Date } | null | undefined
  return {
    ...docToCard(id, data),
    description: (data.description as string) ?? '',
    features: (data.features as string[]) ?? [],
    platforms: (data.platforms as Platform[]) ?? ['web'],
    pricingNote: data.pricingNote as string | undefined,
    tags: (data.tags as string[]) ?? [],
    favoriteCount: (data.favoriteCount as number) ?? 0,
    viewCount: (data.viewCount as number) ?? 0,
    addedDate: createdAt
      ? createdAt.toDate().toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }
}

export function docToReview(id: string, data: DocumentData): MockReview {
  const createdAt = data.createdAt as { toDate(): Date } | null | undefined
  return {
    id,
    userId: data.userId as string,
    userName: (data.userDisplayName as string) ?? 'Anonymous',
    userAvatar: (data.userPhotoURL as string | null | undefined) ?? undefined,
    rating: data.rating as number,
    title: (data.title as string) ?? '',
    body: (data.body as string) ?? '',
    date: createdAt
      ? createdAt.toDate().toISOString()
      : new Date().toISOString(),
    helpfulCount: (data.helpfulCount as number) ?? 0,
    isVerified: (data.isVerified as boolean) ?? false,
  }
}
