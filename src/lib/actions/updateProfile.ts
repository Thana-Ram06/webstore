'use client'

import { doc, setDoc } from 'firebase/firestore'
import { db, Collections, serverTimestamp } from '@/lib/firebase/firestore'
import { profileUpdateSchema } from '@/lib/utils/validators'

export async function updateProfile(
  userId: string,
  data: { displayName: string; bio?: string; websiteUrl?: string },
): Promise<void> {
  const validated = profileUpdateSchema.parse(data)
  await setDoc(
    doc(db, Collections.USERS, userId),
    {
      displayName: validated.displayName,
      bio: validated.bio ?? null,
      websiteUrl: validated.websiteUrl || null,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
