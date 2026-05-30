'use server'

import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import type { UserRole } from '@/types'

export async function updateUserRole(
  userId: string,
  role: UserRole,
  adminId: string,
): Promise<void> {
  const [db, auth] = [getAdminDb(), getAdminAuth()]

  await Promise.all([
    // Set Firebase Auth custom claim so Firestore rules see the new role immediately
    auth.setCustomUserClaims(userId, { role }),
    // Update Firestore user doc
    db.collection('users').doc(userId).update({
      role,
      updatedAt: FieldValue.serverTimestamp(),
    }),
  ])

  await db.collection('auditLogs').add({
    action: 'roleChange',
    userId,
    newRole: role,
    performedBy: adminId,
    reason: null,
    timestamp: FieldValue.serverTimestamp(),
  })
}
