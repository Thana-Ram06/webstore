import Link from 'next/link'
import { AppLogo } from './subcomponents/AppLogo'
import { PricingBadge } from './subcomponents/PricingBadge'
import { RatingDisplay } from './subcomponents/RatingDisplay'
import { FavoriteButton } from './subcomponents/FavoriteButton'
import { cn } from '@/lib/utils/cn'
import type { WebAppCardData } from '@/types'

interface CompactWebAppCardProps {
  app: WebAppCardData
  className?: string
  /** Hide the favorite button — useful in read-only lists */
  hideFavorite?: boolean
  /** Show the full tagline row — default true */
  showTagline?: boolean
  /** Rank number to show left of logo */
  rank?: number
}

export function CompactWebAppCard({
  app,
  className,
  hideFavorite = false,
  showTagline = true,
  rank,
}: CompactWebAppCardProps) {
  const { id, slug, name, tagline, logoUrl, pricing, averageRating, reviewCount } = app

  return (
    <article
      className={cn(
        'group relative flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5',
        'transition-all duration-150 ease-out',
        'hover:border-border/70 hover:bg-muted/40',
        className,
      )}
    >
      {/* Stretched link */}
      <Link
        href={`/apps/${slug}`}
        className="absolute inset-0 z-0 rounded-xl"
        aria-hidden
        tabIndex={-1}
      />

      {/* Rank number */}
      {rank !== undefined && (
        <span className="relative z-10 flex h-9 w-5 shrink-0 items-center text-sm font-medium tabular-nums text-muted-foreground/50">
          {rank}
        </span>
      )}

      {/* Logo */}
      <AppLogo src={logoUrl} name={name} size="sm" className="relative z-10 mt-0.5 shrink-0" />

      {/* Text */}
      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            href={`/apps/${slug}`}
            className="truncate text-sm font-medium text-foreground hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {name}
          </Link>
          <PricingBadge pricing={pricing} size="xs" className="shrink-0" />
        </div>

        {showTagline && (
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{tagline}</p>
        )}

        <div className="mt-1">
          <RatingDisplay rating={averageRating} count={reviewCount} />
        </div>
      </div>

      {/* Favorite */}
      {!hideFavorite && (
        <FavoriteButton
          appId={id}
          appSlug={slug}
          className="relative z-10 mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </article>
  )
}
