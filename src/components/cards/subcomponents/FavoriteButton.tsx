'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { useFavorite } from '@/hooks/useFavorite'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

interface FavoriteButtonProps {
  appId: string
  appSlug: string
  className?: string
  variant?: 'default' | 'overlay'
}

export function FavoriteButton({ appId, appSlug, className, variant = 'default' }: FavoriteButtonProps) {
  const { user } = useAuth()
  const { isFavorited, toggle, loading } = useFavorite(appId)
  const router = useRouter()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!user) {
        router.push(`/login?callbackUrl=${encodeURIComponent(`/apps/${appSlug}`)}`)
        return
      }
      void toggle()
    },
    [user, toggle, router, appSlug],
  )

  const isOverlay = variant === 'overlay'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorited}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        isOverlay
          ? [
              'h-8 w-8',
              'bg-black/40 backdrop-blur-sm',
              'hover:bg-black/60',
              isFavorited ? 'text-rose-400' : 'text-white/80 hover:text-white',
            ]
          : [
              'h-7 w-7',
              'hover:bg-muted',
              isFavorited ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500',
            ],
        className,
      )}
    >
      <Heart
        className={cn(
          'transition-transform duration-150',
          isOverlay ? 'h-3.5 w-3.5' : 'h-3.5 w-3.5',
          isFavorited && 'fill-current scale-110',
          !isFavorited && 'hover:scale-110',
        )}
        aria-hidden
      />
    </button>
  )
}
