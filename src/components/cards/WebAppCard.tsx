'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AppLogo } from './subcomponents/AppLogo'
import { PricingBadge } from './subcomponents/PricingBadge'
import { RatingDisplay } from './subcomponents/RatingDisplay'
import { CategoryPill } from './subcomponents/CategoryPill'
import { FavoriteButton } from './subcomponents/FavoriteButton'
import { cn } from '@/lib/utils/cn'
import type { WebAppCardData } from '@/types'

interface WebAppCardProps {
  app: WebAppCardData
  className?: string
}

export function WebAppCard({ app, className }: WebAppCardProps) {
  const { id, slug, name, tagline, logoUrl, websiteUrl, categorySlug, pricing, averageRating, reviewCount } = app

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card',
        'p-4 transition-all duration-200 ease-out',
        'hover:-translate-y-px hover:border-border/70 hover:shadow-md',
        className,
      )}
    >
      {/* Stretched link — mouse / pointer users navigate by clicking anywhere */}
      <Link
        href={`/apps/${slug}`}
        className="absolute inset-0 z-0 rounded-xl"
        aria-hidden
        tabIndex={-1}
      />

      {/* Header row: logo + name/category + actions */}
      <div className="relative z-10 flex items-start gap-3">
        <AppLogo src={logoUrl} name={name} size="md" className="shrink-0" />

        <div className="min-w-0 flex-1">
          {/* App name — real focusable link */}
          <Link
            href={`/apps/${slug}`}
            className="block truncate text-sm font-semibold text-foreground hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded"
          >
            {name}
          </Link>
          <CategoryPill slug={categorySlug} interactive className="mt-0.5" />
        </div>

        {/* Top-right: favorite */}
        <FavoriteButton appId={id} appSlug={slug} className="shrink-0 -mr-1 -mt-0.5" />
      </div>

      {/* Tagline */}
      <p className="relative z-10 mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {tagline}
      </p>

      {/* Footer row: rating + pricing + visit */}
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <RatingDisplay rating={averageRating} count={reviewCount} className="flex-1" />
        <PricingBadge pricing={pricing} size="xs" />
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${name} website`}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full',
            'text-muted-foreground transition-all duration-150',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <ArrowUpRight className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </article>
  )
}
