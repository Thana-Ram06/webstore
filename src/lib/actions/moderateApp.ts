'use client'

import { doc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { db, Collections, serverTimestamp } from '@/lib/firebase/firestore'

export async function moderateApp(
  appId: string,
  action: 'approve' | 'reject',
  reviewerId: string,
  rejectionReason?: string,
): Promise<void> {
  const status = action === 'approve' ? 'approved' : 'rejected'

  await updateDoc(doc(db, Collections.APPS, appId), {
    status,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
    ...(action === 'reject' && rejectionReason ? { rejectionReason } : {}),
    updatedAt: serverTimestamp(),
  })

  await addDoc(collection(db, Collections.AUDIT_LOGS), {
    action,
    appId,
    performedBy: reviewerId,
    reason: rejectionReason ?? null,
    timestamp: serverTimestamp(),
  })
}
