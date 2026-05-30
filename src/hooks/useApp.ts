'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  onSnapshot,
  where,
  orderBy,
  limit,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Collections, createCollection } from '@/lib/firebase/firestore'
import type { AppDoc } from '@/types'

const appsCollection = createCollection<AppDoc>(Collections.APPS)

export function useApp(appId: string) {
  const [app, setApp] = useState<AppDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!appId) {
      setLoading(false)
      return
    }

    const unsub = onSnapshot(
      appsCollection.docRef(appId),
      (snap) => {
        setApp(snap.exists() ? snap.data() : null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsub
  }, [appId])

  return { app, loading, error }
}

export function useFeaturedApps(count = 6) {
  const [apps, setApps] = useState<AppDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchApps = useCallback(async () => {
    setLoading(true)
    try {
      const results = await appsCollection.query(
        where('status', '==', 'approved'),
        where('isFeatured', '==', true),
        orderBy('featuredAt', 'desc'),
        limit(count),
      )
      setApps(results)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [count])

  useEffect(() => { void fetchApps() }, [fetchApps])

  return { apps, loading, error, refetch: fetchApps }
}

export function useAppsByCategory(categorySlug: string, pageLimit = 12) {
  const [apps, setApps] = useState<AppDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [cursor, setCursor] = useState<QueryDocumentSnapshot | undefined>(undefined)

  const fetchPage = useCallback(async (reset: boolean, currentCursor?: QueryDocumentSnapshot) => {
    setLoading(true)
    try {
      const result = await appsCollection.paginate(
        [
          where('status', '==', 'approved'),
          where('categorySlug', '==', categorySlug),
          orderBy('score', 'desc'),
        ],
        pageLimit,
        reset ? undefined : currentCursor,
      )
      setApps((prev) => (reset ? result.items : [...prev, ...result.items]))
      setHasMore(result.hasMore)
      setCursor(result.lastCursor as QueryDocumentSnapshot | undefined)
    } finally {
      setLoading(false)
    }
  }, [categorySlug, pageLimit])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { void fetchPage(true) }, [categorySlug])

  return { apps, loading, hasMore, loadMore: () => fetchPage(false, cursor) }
}
