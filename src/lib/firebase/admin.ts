import 'server-only'

import { cert, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

let adminApp: App | undefined
let _adminAuth: Auth | undefined
let _adminDb: Firestore | undefined

function getAdminApp(): App {
  if (adminApp) return adminApp

  const existing = getApps().find((a) => a.name === 'admin')
  if (existing) {
    adminApp = existing
    return adminApp
  }

  adminApp = initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    },
    'admin',
  )

  return adminApp
}

export function getAdminAuth(): Auth {
  if (!_adminAuth) _adminAuth = getAuth(getAdminApp())
  return _adminAuth
}

export function getAdminDb(): Firestore {
  if (!_adminDb) _adminDb = getFirestore(getAdminApp())
  return _adminDb
}

