'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/Skeleton'

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
  fallback?: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAdmin = false,
  fallback,
  redirectTo,
}: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const isAuthorized = !loading && user && (!requireAdmin || user.role === 'admin')

  useEffect(() => {
    if (loading) return

    if (!user) {
      const dest = redirectTo ?? `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      router.replace(dest)
      return
    }

    if (requireAdmin && user.role !== 'admin') {
      router.replace('/')
    }
  }, [loading, user, requireAdmin, redirectTo, router])

  if (loading) {
    return fallback ?? <AuthGuardSkeleton />
  }

  if (!isAuthorized) return null

  return <>{children}</>
}

function AuthGuardSkeleton() {
  return (
    <div className="flex min-h-[60vh] flex-col gap-6 p-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
