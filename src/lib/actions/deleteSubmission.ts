'use client'

import { createCollection, Collections } from '@/lib/firebase/firestore'
import type { AppDoc } from '@/types'

const appsCollection = createCollection<AppDoc>(Collections.APPS)

export async function deleteSubmission(appId: string): Promise<void> {
  await appsCollection.update(appId, { status: 'deleted' })
}
