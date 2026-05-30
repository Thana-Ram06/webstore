'use client'

import { useEffect, useState } from 'react'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import { useUserFavorites } from './useFavorite'
import type { AppDoc, WebAppCardData } from '@/types'

const appsCollection = createCollection<AppDoc>(Collections.APPS)

function appToCardData(app: AppDoc): WebAppCardData {
  return {
    id: app.id,
    slug: app.slug,
    name: app.name,
    tagline: app.tagline,
    logoUrl: app.logoUrl,
    screenshotUrls: app.screenshotUrls,
    websiteUrl: app.websiteUrl,
    categorySlug: app.categorySlug,
    pricing: app.pricing,
    averageRating: app.averageRating,
    reviewCount: app.reviewCount,
    isFeatured: app.isFeatured,
  }
}

export function useUserFavoritedApps() {
  const { favorites, loading: favLoading } = useUserFavorites()
  const [apps, setApps] = useState<WebAppCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favLoading) return

    if (favorites.length === 0) {
      setApps([])
      setLoading(false)
      return
    }

    async function fetchApps() {
      const results = await Promise.all(
        favorites.map((fav) => appsCollection.getById(fav.appId)),
      )
      setApps(
        results
          .filter((app): app is AppDoc => app !== null && app.status !== 'deleted')
          .map(appToCardData),
      )
      setLoading(false)
    }

    void fetchApps().catch(() => {
      setApps([])
      setLoading(false)
    })
  }, [favorites, favLoading])

  return { apps, loading: loading || favLoading }
}
