export const dynamic = 'force-dynamic'

import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin'
import { createSessionToken } from '@/lib/session'
import { setSessionCookie, clearSessionCookie } from '@/lib/auth-cookies'
import type { UserRole } from '@/types'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { idToken?: string }
    const { idToken } = body

    if (!idToken || typeof idToken !== 'string') {
      return Response.json({ error: 'Missing idToken' }, { status: 400 })
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken)
    const role = (decoded.role as UserRole) ?? 'user'

    const sessionToken = await createSessionToken({
      uid: decoded.uid,
      email: decoded.email ?? '',
      displayName: decoded.name ?? '',
      photoURL: decoded.picture ?? null,
      role,
    })

    await setSessionCookie(sessionToken)

    // Create user profile on first login
    const db = getAdminDb()
    const userRef = db.collection('users').doc(decoded.uid)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      await userRef.set({
        uid: decoded.uid,
        email: decoded.email ?? '',
        displayName: decoded.name ?? '',
        photoURL: decoded.picture ?? null,
        role: 'user',
        submittedApps: [],
        favoriteCount: 0,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[auth/session POST]', err)
    return Response.json({ error: 'Authentication failed' }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    await clearSessionCookie()
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[auth/session DELETE]', err)
    return Response.json({ error: 'Sign out failed' }, { status: 500 })
  }
}
