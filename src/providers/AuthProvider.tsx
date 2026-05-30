'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { onIdTokenChanged, type User } from 'firebase/auth'
import { clientAuth, signInWithGoogle, signOut } from '@/lib/firebase/auth'
import type { SessionUser, UserRole } from '@/types'

interface AuthContextValue {
  user: SessionUser | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
  initialSession?: SessionUser | null
}

export function AuthProvider({ children, initialSession = null }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(initialSession)
  const [loading, setLoading] = useState(!initialSession)

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(clientAuth, async (firebaseUser: User | null) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const tokenResult = await firebaseUser.getIdTokenResult()
      const role = (tokenResult.claims.role as UserRole) ?? 'user'

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? '',
        photoURL: firebaseUser.photoURL,
        role,
      })
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleSignIn = useCallback(async () => {
    const idToken = await signInWithGoogle()

    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    if (!res.ok) {
      throw new Error('Session creation failed')
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut()
    await fetch('/api/auth/session', { method: 'DELETE' })
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>')
  return ctx
}
