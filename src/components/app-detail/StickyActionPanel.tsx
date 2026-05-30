'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, Heart, Star } from 'lucide-react'
import { useFavorite } from '@/hooks/useFavorite'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'
import type { AppDetail } from '@/types/detail'

interface StickyActionPanelProps {
  app: AppDetail
  variant: 'sidebar' | 'mobile-bar'
}

function SaveButton({
  appId,
  appSlug,
  compact = false,
}: {
  appId: string
  appSlug: string
  compact?: boolean
}) {
  const { user } = useAuth()
  const { isFavorited, toggle, loading } = useFavorite(appId)
  const router = useRouter()

  const handleSave = useCallback(() => {
    if (!user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/apps/${appSlug}`)}`)
      return
    }
    void toggle()
  }, [user, toggle, router, appSlug])

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
        aria-pressed={isFavorited}
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          isFavorited
            ? 'border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-800 dark:bg-rose-900/20'
            : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted',
        )}
      >
        <Heart
          className={cn('h-4 w-4 transition-transform', isFavorited && 'fill-current')}
          aria-hidden
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        isFavorited
          ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
          : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Heart
        className={cn('h-4 w-4', isFavorited && 'fill-current')}
        aria-hidden
      />
      {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
    </button>
  )
}

export function StickyActionPanel({ app, variant }: StickyActionPanelProps) {
  if (variant === 'sidebar') {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        {/* CTAs */}
        <div className="space-y-2.5">
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5',
              'bg-accent text-sm font-semibold text-white',
              'transition-colors hover:bg-accent/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Visit Website
          </a>
          <SaveButton appId={app.id} appSlug={app.slug} />
        </div>

        {/* Stats */}
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="text-sm font-semibold text-foreground">
              {app.averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              (
              {app.reviewCount >= 1000
                ? `${(app.reviewCount / 1000).toFixed(1)}k`
                : app.reviewCount}{' '}
              reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-3.5 w-3.5" aria-hidden />
            {app.favoriteCount.toLocaleString()} saves
          </div>
        </div>
      </div>
    )
  }

  // mobile-bar variant
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 px-4 py-3">
        <a
          href={app.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5',
            'bg-accent text-sm font-semibold text-white',
            'transition-colors hover:bg-accent/90',
          )}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Visit Website
        </a>
        <SaveButton appId={app.id} appSlug={app.slug} compact />
      </div>
    </div>
  )
}
