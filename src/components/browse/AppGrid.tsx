'use client'

import { useState } from 'react'
import { WebAppCard } from '@/components/cards'
import { WebAppCardGridSkeleton } from '@/components/cards'
import { EmptyState } from './EmptyState'
import { countActiveFilters } from '@/lib/utils/browse'
import { PAGE_SIZE } from '@/lib/data/browseUtils'
import { cn } from '@/lib/utils/cn'
import type { WebAppCardData } from '@/types'
import type { BrowseFilters } from '@/types/browse'

interface AppGridProps {
  apps: WebAppCardData[]
  totalCount: number
  filters: BrowseFilters
  isLoading?: boolean
}

export function AppGrid({ apps, totalCount, filters, isLoading }: AppGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visibleApps = apps.slice(0, visibleCount)
  const hasMore = visibleCount < apps.length
  const activeFilterCount = countActiveFilters(filters)
  const hasAnyFilter = activeFilterCount > 0 || Boolean(filters.q)

  if (isLoading) {
    return <WebAppCardGridSkeleton count={PAGE_SIZE} />
  }

  if (apps.length === 0) {
    return <EmptyState hasFilters={hasAnyFilter} query={filters.q} />
  }

  return (
    <div>
      {/* Result count */}
      <p className="mb-5 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalCount}</span>{' '}
        {totalCount === 1 ? 'app' : 'apps'}
        {filters.q && (
          <>
            {' '}for{' '}
            <span className="font-medium text-foreground">&ldquo;{filters.q}&rdquo;</span>
          </>
        )}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {visibleApps.map((app) => (
          <WebAppCard key={app.id} app={app} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className={cn(
              'rounded-full border border-border bg-card px-8 py-2.5',
              'text-sm font-medium text-foreground',
              'transition-all hover:bg-muted hover:shadow-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Load more apps
            <span className="ml-1.5 text-muted-foreground">
              ({apps.length - visibleCount} remaining)
            </span>
          </button>
        </div>
      )}

      {!hasMore && apps.length > PAGE_SIZE && (
        <p className="mt-10 text-center text-xs text-muted-foreground/50">
          You&apos;ve seen all {totalCount} apps
        </p>
      )}
    </div>
  )
}
