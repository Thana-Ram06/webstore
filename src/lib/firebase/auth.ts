'use client'

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { clientApp } from './config'

export const clientAuth = getAuth(clientApp)

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')
googleProvider.addScope('profile')

export async function signInWithGoogle(): Promise<string> {
  const result = await signInWithPopup(clientAuth, googleProvider)
  return result.user.getIdToken()
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(clientAuth)
}

export async function getIdToken(): Promise<string | null> {
  const user = clientAuth.currentUser
  if (!user) return null
  return user.getIdToken()
}
