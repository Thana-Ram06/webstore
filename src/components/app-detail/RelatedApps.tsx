import Link from 'next/link'
import { CompactWebAppCard } from '@/components/cards/CompactWebAppCard'
import type { WebAppCardData } from '@/types'
import type { CategorySlug } from '@/types'

interface RelatedAppsProps {
  apps: WebAppCardData[]
  categorySlug: CategorySlug
}

export function RelatedApps({ apps, categorySlug }: RelatedAppsProps) {
  if (apps.length === 0) return null

  const categoryLabel = categorySlug.replace(/-/g, ' ')

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Similar Apps</h2>
        <Link
          href={`/apps?category=${categorySlug}`}
          className="text-sm text-accent hover:underline"
        >
          View all {categoryLabel} →
        </Link>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {apps.map((app) => (
          <CompactWebAppCard key={app.id} app={app} hideFavorite />
        ))}
      </div>
    </div>
  )
}
