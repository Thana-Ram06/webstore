'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { FilterSidebar } from './FilterSidebar'
import { MobileFiltersDrawer } from './MobileFiltersDrawer'
import { BrowseSearchBar } from './BrowseSearchBar'
import { ActiveFilters } from './ActiveFilters'
import { AppGrid } from './AppGrid'
import { buildBrowseUrl, countActiveFilters } from '@/lib/utils/browse'
import { cn } from '@/lib/utils/cn'
import type { WebAppCardData } from '@/types'
import type { BrowseFilters } from '@/types/browse'

interface BrowseLayoutProps {
  apps: WebAppCardData[]
  totalCount: number
  filters: BrowseFilters
  categoryCounts?: Record<string, number>
  pricingCounts?: Record<string, number>
}

const SORT_LABELS: Record<string, string> = {
  trending: 'Trending',
  newest: 'Newest',
  'top-rated': 'Top Rated',
  'most-favorited': 'Most Favorited',
}

export function BrowseLayout({ apps, totalCount, filters, categoryCounts = {}, pricingCounts = {} }: BrowseLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeFilterCount = countActiveFilters(filters)
  const currentSort = filters.sort ?? 'trending'

  // Key resets AppGrid's visibleCount state whenever filters change
  const gridKey = [
    filters.q,
    filters.category,
    filters.pricing,
    filters.platform,
    filters.sort,
    filters.featured,
  ].join('|')

  return (
    <>
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm">
        <Container className="py-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Browse Web Apps
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Discover the best tools across every category
              </p>
            </div>

            {/* Mobile: filters + sort toggles */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground',
                  'transition-colors hover:bg-muted',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  activeFilterCount > 0 && 'border-accent/40 bg-accent-subtle text-accent',
                )}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                Filters
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <Container className="py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
            <div className="sticky top-20">
              <FilterSidebar filters={filters} categoryCounts={categoryCounts} pricingCounts={pricingCounts} />
            </div>
          </aside>

          {/* Content area */}
          <div className="min-w-0 flex-1">
            {/* Search + sort row */}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex-1">
                <BrowseSearchBar filters={filters} />
              </div>

              {/* Desktop sort quick-switch */}
              <div className="hidden items-center gap-1 lg:flex">
                {(['trending', 'newest', 'top-rated'] as const).map((s) => (
                  <Link
                    key={s}
                    href={buildBrowseUrl({ ...filters, sort: s })}
                    className={cn(
                      'rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                      currentSort === s
                        ? 'bg-accent-subtle text-accent'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {SORT_LABELS[s]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Active filter chips */}
            <ActiveFilters filters={filters} />

            {/* Results grid */}
            <AppGrid
              key={gridKey}
              apps={apps}
              totalCount={totalCount}
              filters={filters}
            />
          </div>
        </div>
      </Container>

      {/* Mobile filter drawer */}
      <MobileFiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        activeFilterCount={activeFilterCount}
        categoryCounts={categoryCounts}
        pricingCounts={pricingCounts}
      />
    </>
  )
}
