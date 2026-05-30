'use client'

import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { createCollection, Collections } from '@/lib/firebase/firestore'
import { useAuth } from './useAuth'
import type { UserProfile } from '@/types'

const usersCollection = createCollection<UserProfile & { id: string }>(Collections.USERS)

export function useUserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<(UserProfile & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    const unsub = onSnapshot(usersCollection.docRef(user.uid), (snap) => {
      setProfile(snap.exists() ? (snap.data() as UserProfile & { id: string }) : null)
      setLoading(false)
    })

    return unsub
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  return { profile, loading }
}
