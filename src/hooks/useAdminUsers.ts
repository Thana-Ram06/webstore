'use client'

import { useEffect, useState } from 'react'
import { onSnapshot, query, orderBy } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import type { UserProfile } from '@/types'

const usersCollection = createCollection<UserProfile & { id: string }>(Collections.USERS)

export function useAdminUsers() {
  const [users, setUsers] = useState<(UserProfile & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(usersCollection.ref(), orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => d.data() as UserProfile & { id: string }))
      setLoading(false)
    })

    return unsub
  }, [])

  return { users, loading }
}
