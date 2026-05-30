'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { AppLogo } from './subcomponents/AppLogo'
import { PricingBadge } from './subcomponents/PricingBadge'
import { RatingDisplay } from './subcomponents/RatingDisplay'
import { CategoryPill } from './subcomponents/CategoryPill'
import { FavoriteButton } from './subcomponents/FavoriteButton'
import { cn } from '@/lib/utils/cn'
import type { WebAppCardData } from '@/types'

interface FeaturedWebAppCardProps {
  app: WebAppCardData
  className?: string
  /** Show a larger "hero" variant — wider image, more padding */
  hero?: boolean
}

export function FeaturedWebAppCard({ app, className, hero = false }: FeaturedWebAppCardProps) {
  const {
    id, slug, name, tagline, logoUrl,
    screenshotUrls, websiteUrl,
    categorySlug, pricing,
    averageRating, reviewCount,
  } = app

  const screenshot = screenshotUrls[0]

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-border/70 hover:shadow-lg',
        className,
      )}
    >
      {/* ── Screenshot section ── */}
      <div className={cn('relative overflow-hidden bg-muted', hero ? 'aspect-[21/9]' : 'aspect-[16/9]')}>

        {screenshot ? (
          <Image
            src={screenshot}
            alt={`${name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            unoptimized={screenshot.startsWith('http')}
          />
        ) : (
          /* Placeholder when no screenshot */
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent-subtle)) 0%, hsl(var(--muted)) 100%)',
            }}
          >
            <span
              className="font-serif text-7xl font-normal text-muted-foreground/20 select-none"
              style={{ fontFamily: 'var(--font-instrument-serif), serif' }}
              aria-hidden
            >
              {name[0]}
            </span>
          </div>
        )}

        {/* Bottom gradient — adds depth even without screenshot */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" aria-hidden />

        {/* Featured badge — top left */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-amber-400" aria-hidden />
          Featured
        </div>

        {/* Favorite — top right overlay */}
        <div className="absolute right-3 top-3">
          <FavoriteButton appId={id} appSlug={slug} variant="overlay" />
        </div>
      </div>

      {/* ── Content section ── */}
      <div className={cn('relative', hero ? 'p-6' : 'p-5')}>
        {/* Stretched link */}
        <Link
          href={`/apps/${slug}`}
          className="absolute inset-0 z-0 rounded-b-2xl"
          aria-hidden
          tabIndex={-1}
        />

        <div className="relative z-10 flex items-start gap-4">
          {/* Logo */}
          <AppLogo src={logoUrl} name={name} size="lg" className="shrink-0 ring-1 ring-border" />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  href={`/apps/${slug}`}
                  className={cn(
                    'block font-semibold text-foreground hover:text-accent',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
                    hero ? 'text-base' : 'text-sm',
                  )}
                >
                  {name}
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <CategoryPill slug={categorySlug} interactive />
                  <span className="text-muted-foreground/40" aria-hidden>·</span>
                  <PricingBadge pricing={pricing} size="xs" />
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className={cn('mt-2 line-clamp-2 leading-relaxed text-muted-foreground', hero ? 'text-sm' : 'text-xs')}>
              {tagline}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-4 flex items-center justify-between">
          <RatingDisplay rating={averageRating} count={reviewCount} size={hero ? 'md' : 'sm'} />

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'flex items-center gap-1.5 rounded-full',
              'bg-accent px-3.5 py-1.5 text-xs font-medium text-accent-foreground',
              'transition-all duration-150 hover:bg-accent-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            )}
          >
            {hero ? 'Open Web App' : 'Visit'}
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  )
}
