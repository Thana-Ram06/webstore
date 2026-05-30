'use client'

import { useAuthContext } from '@/providers/AuthProvider'

export function useAuth() {
  return useAuthContext()
}

export function useUser() {
  const { user } = useAuthContext()
  return user
}

export function useIsAdmin(): boolean {
  const { user } = useAuthContext()
  return user?.role === 'admin'
}
