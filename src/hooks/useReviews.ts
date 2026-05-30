'use client'

import { useEffect, useState, useCallback } from 'react'
import { onSnapshot, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import { useAuth } from './useAuth'
import type { ReviewDoc } from '@/types'

const reviewsCollection = createCollection<ReviewDoc>(Collections.REVIEWS)

export function useAppReviews(appId: string, pageLimit = 10) {
  const [reviews, setReviews] = useState<ReviewDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!appId) return

    const q = query(
      reviewsCollection.ref(),
      where('appId', '==', appId),
      orderBy('createdAt', 'desc'),
      limit(pageLimit),
    )

    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => d.data()))
      setLoading(false)
    })

    return unsub
  }, [appId, pageLimit])

  return { reviews, loading }
}

export function useUserReview(appId: string) {
  const { user } = useAuth()
  const [review, setReview] = useState<ReviewDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !appId) {
      setReview(null)
      setLoading(false)
      return
    }

    const q = query(
      reviewsCollection.ref(),
      where('appId', '==', appId),
      where('userId', '==', user.uid),
      limit(1),
    )

    const unsub = onSnapshot(q, (snap) => {
      setReview(snap.docs[0]?.data() ?? null)
      setLoading(false)
    })

    return unsub
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId, user?.uid])

  return { review, loading }
}

export function useSubmitReview(appId: string) {
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (data: { rating: number; title: string; body: string }) => {
      if (!user) throw new Error('Must be signed in to leave a review.')

      setSubmitting(true)
      setError(null)

      try {
        const id = `${appId}_${user.uid}`
        await reviewsCollection.create(id, {
          appId,
          userId: user.uid,
          userDisplayName: user.displayName,
          userPhotoURL: user.photoURL,
          rating: data.rating,
          title: data.title,
          body: data.body,
          helpfulCount: 0,
          isVerified: false,
          createdAt: serverTimestamp() as ReviewDoc['createdAt'],
          updatedAt: serverTimestamp() as ReviewDoc['updatedAt'],
        })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit review.'
        setError(message)
        throw err
      } finally {
        setSubmitting(false)
      }
    },
    [user, appId],
  )

  return { submit, submitting, error }
}
