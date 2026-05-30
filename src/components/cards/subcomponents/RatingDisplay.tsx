import { Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface RatingDisplayProps {
  rating: number
  count?: number
  size?: 'sm' | 'md'
  className?: string
}

export function RatingDisplay({ rating, count, size = 'sm', className }: RatingDisplayProps) {
  const hasRating = rating > 0 && (count === undefined || count > 0)

  if (!hasRating) {
    return (
      <span className={cn('text-xs text-muted-foreground/60', className)}>
        No reviews
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star
        className={cn(
          'shrink-0 fill-amber-400 text-amber-400',
          size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5',
        )}
        aria-hidden
      />
      <span className={cn('font-medium tabular-nums text-foreground', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-xs text-muted-foreground">
          ({count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count})
        </span>
      )}
    </span>
  )
}
