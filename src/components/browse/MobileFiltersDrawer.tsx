'use client'

import { useEffect } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { FilterSidebar } from './FilterSidebar'
import { cn } from '@/lib/utils/cn'
import type { BrowseFilters } from '@/types/browse'

interface MobileFiltersDrawerProps {
  open: boolean
  onClose: () => void
  filters: BrowseFilters
  activeFilterCount: number
  categoryCounts?: Record<string, number>
  pricingCounts?: Record<string, number>
}

export function MobileFiltersDrawer({
  open,
  onClose,
  filters,
  activeFilterCount,
  categoryCounts,
  pricingCounts,
}: MobileFiltersDrawerProps) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden',
          'transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 lg:hidden',
          'max-h-[85dvh] overflow-y-auto',
          'rounded-t-2xl border-t border-border bg-background shadow-lg',
          'transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" aria-hidden />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm font-semibold text-foreground">Filters</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Filter content */}
        <div className="px-4 py-4 pb-safe">
          <FilterSidebar filters={filters} categoryCounts={categoryCounts} pricingCounts={pricingCounts} />
        </div>
      </div>
    </>
  )
}
