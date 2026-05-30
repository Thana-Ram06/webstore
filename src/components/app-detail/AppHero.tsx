import Link from 'next/link'
import { Eye, Heart, ExternalLink } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { PricingBadge } from '@/components/cards/subcomponents/PricingBadge'
import { CategoryPill } from '@/components/cards/subcomponents/CategoryPill'
import { RatingDisplay } from '@/components/cards/subcomponents/RatingDisplay'
import type { AppDetail } from '@/types/detail'

interface AppHeroProps {
  app: AppDetail
}

export function AppHero({ app }: AppHeroProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="py-8 sm:py-10">
        <div className="flex items-start gap-5 sm:gap-6">
          <AppLogo
            src={app.logoUrl}
            name={app.name}
            size="xl"
            className="shrink-0 rounded-2xl shadow-sm ring-1 ring-border"
          />

          <div className="min-w-0 flex-1">
            {/* Name + tagline */}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {app.name}
            </h1>
            <p className="mt-1 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {app.tagline}
            </p>

            {/* Badges row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <CategoryPill slug={app.categorySlug} interactive />
              <PricingBadge pricing={app.pricing} size="sm" />
              {app.pricingNote && (
                <span className="text-xs text-muted-foreground">— {app.pricingNote}</span>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <RatingDisplay
                rating={app.averageRating}
                count={app.reviewCount}
                size="md"
              />
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Heart className="h-3.5 w-3.5" aria-hidden />
                {app.favoriteCount.toLocaleString()} saves
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Eye className="h-3.5 w-3.5" aria-hidden />
                {app.viewCount >= 1000
                  ? `${(app.viewCount / 1000).toFixed(1)}k`
                  : app.viewCount.toLocaleString()}{' '}
                views
              </span>
            </div>

            {/* Mobile CTA (desktop CTA is in sidebar) */}
            <div className="mt-4 lg:hidden">
              <a
                href={app.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mt-5 text-xs text-muted-foreground">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/apps" className="hover:text-foreground transition-colors">
                Browse
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/apps?category=${app.categorySlug}`}
                className="hover:text-foreground transition-colors capitalize"
              >
                {app.categorySlug.replace(/-/g, ' ')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground font-medium truncate max-w-[160px]">{app.name}</li>
          </ol>
        </nav>
      </Container>
    </div>
  )
}
