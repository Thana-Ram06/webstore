'use client'

import { useEffect, useState } from 'react'
import { onSnapshot, query, orderBy } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import type { AppDoc } from '@/types'

const appsCollection = createCollection<AppDoc>(Collections.APPS)

export function useAdminSubmissions() {
  const [apps, setApps] = useState<AppDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(appsCollection.ref(), orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(q, (snap) => {
      setApps(
        snap.docs
          .map((d) => d.data())
          .filter((app) => app.status !== 'deleted'),
      )
      setLoading(false)
    })

    return unsub
  }, [])

  return { apps, loading }
}
