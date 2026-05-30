import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { PricingBadge } from '@/components/cards/subcomponents/PricingBadge'
import { CategoryPill } from '@/components/cards/subcomponents/CategoryPill'
import type { AppDetail } from '@/types/detail'
import type { Platform } from '@/types'

const PLATFORM_LABELS: Record<Platform, string> = {
  web: 'Web',
  pwa: 'PWA',
  desktop: 'Desktop',
  extension: 'Extension',
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function formatAddedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

interface InfoCardProps {
  app: AppDetail
}

export function InfoCard({ app }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">App Info</h3>
      <dl className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-sm text-muted-foreground">Category</dt>
          <dd>
            <CategoryPill slug={app.categorySlug} interactive />
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-sm text-muted-foreground">Pricing</dt>
          <dd className="flex flex-col items-end gap-0.5">
            <PricingBadge pricing={app.pricing} size="sm" />
            {app.pricingNote && (
              <span className="text-[11px] text-muted-foreground/70">{app.pricingNote}</span>
            )}
          </dd>
        </div>

        {app.platforms.length > 0 && (
          <div className="flex items-start justify-between gap-3">
            <dt className="text-sm text-muted-foreground">Platform</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground"
                >
                  {PLATFORM_LABELS[p]}
                </span>
              ))}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <dt className="text-sm text-muted-foreground">Website</dt>
          <dd>
            <a
              href={app.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              {getDomain(app.websiteUrl)}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-sm text-muted-foreground">Added</dt>
          <dd className="text-sm text-foreground">{formatAddedDate(app.addedDate)}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-4">
        <Link
          href={`/apps?category=${app.categorySlug}`}
          className="text-xs text-muted-foreground hover:text-accent transition-colors"
        >
          Browse all {app.categorySlug.replace(/-/g, ' ')} apps →
        </Link>
      </div>
    </div>
  )
}
