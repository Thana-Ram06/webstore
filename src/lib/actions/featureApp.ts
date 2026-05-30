'use client'

import { doc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { db, Collections, serverTimestamp } from '@/lib/firebase/firestore'

export async function featureApp(
  appId: string,
  isFeatured: boolean,
  adminId: string,
): Promise<void> {
  await updateDoc(doc(db, Collections.APPS, appId), {
    isFeatured,
    ...(isFeatured ? { featuredAt: serverTimestamp() } : { featuredAt: null }),
    updatedAt: serverTimestamp(),
  })

  await addDoc(collection(db, Collections.AUDIT_LOGS), {
    action: isFeatured ? 'feature' : 'unfeature',
    appId,
    performedBy: adminId,
    reason: null,
    timestamp: serverTimestamp(),
  })
}
