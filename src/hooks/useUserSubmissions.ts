'use client'

import { useEffect, useState } from 'react'
import { onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import { useAuth } from './useAuth'
import type { AppDoc } from '@/types'

const appsCollection = createCollection<AppDoc>(Collections.APPS)

export function useUserSubmissions() {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState<AppDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setSubmissions([])
      setLoading(false)
      return
    }

    const q = query(
      appsCollection.ref(),
      where('submittedBy', '==', user.uid),
      orderBy('createdAt', 'desc'),
    )

    const unsub = onSnapshot(q, (snap) => {
      setSubmissions(
        snap.docs
          .map((d) => d.data())
          .filter((app) => app.status !== 'deleted'),
      )
      setLoading(false)
    })

    return unsub
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  return { submissions, loading }
}
