'use client'

import { useEffect, useState, useCallback } from 'react'
import { onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import { useAuth } from './useAuth'
import type { FavoriteDoc } from '@/types'

const favoritesCollection = createCollection<FavoriteDoc & { id: string }>(Collections.FAVORITES)

export function useFavorite(appId: string) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  const favoriteId = user ? `${user.uid}_${appId}` : null

  useEffect(() => {
    if (!favoriteId) {
      setIsFavorited(false)
      return
    }

    const unsub = onSnapshot(favoritesCollection.docRef(favoriteId), (snap) => {
      setIsFavorited(snap.exists())
    })

    return unsub
  }, [favoriteId])

  const toggle = useCallback(async () => {
    if (!user || !favoriteId) return

    setLoading(true)
    try {
      if (isFavorited) {
        await favoritesCollection.delete(favoriteId)
      } else {
        await favoritesCollection.create(favoriteId, {
          userId: user.uid,
          appId,
          appName: '',
          appLogoUrl: '',
          appSlug: '',
          savedAt: serverTimestamp() as FavoriteDoc['savedAt'],
        })
      }
    } finally {
      setLoading(false)
    }
  }, [user, favoriteId, isFavorited, appId])

  return { isFavorited, toggle, loading }
}

export function useUserFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<(FavoriteDoc & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setFavorites([])
      setLoading(false)
      return
    }

    const q = query(
      favoritesCollection.ref(),
      where('userId', '==', user.uid),
      orderBy('savedAt', 'desc'),
    )

    const unsub = onSnapshot(q, (snap) => {
      setFavorites(snap.docs.map((d) => d.data()))
      setLoading(false)
    })

    return unsub
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  return { favorites, loading }
}
