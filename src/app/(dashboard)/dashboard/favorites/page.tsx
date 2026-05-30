'use client'

import { Heart } from 'lucide-react'
import { WebAppCard } from '@/components/cards/WebAppCard'
import { WebAppCardSkeleton } from '@/components/cards/WebAppCardSkeleton'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { useUserFavoritedApps } from '@/hooks/useUserFavoritedApps'

export default function FavoritesPage() {
  const { apps, loading } = useUserFavoritedApps()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Favorites</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Web apps you&apos;ve saved for quick access.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <WebAppCardSkeleton key={i} />
          ))}
        </div>
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <WebAppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <EmptyDashboardState
          icon={Heart}
          title="No favorites yet"
          description="Save web apps you love by clicking the heart icon on any listing."
          action={{ label: 'Browse Apps', href: '/apps' }}
        />
      )}
    </div>
  )
}
