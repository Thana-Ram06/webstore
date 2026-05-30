'use client'

import { useState, useCallback } from 'react'
import { Package } from 'lucide-react'
import { AdminSubmissionRow } from '@/components/admin/AdminSubmissionRow'
import { AppReviewDrawer } from '@/components/admin/AppReviewDrawer'
import { BulkActionBar } from '@/components/admin/BulkActionBar'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { useAdminSubmissions } from '@/hooks/useAdminSubmissions'
import { cn } from '@/lib/utils/cn'
import type { AppDoc, AppStatus } from '@/types'

type FilterStatus = 'all' | Exclude<AppStatus, 'deleted'>

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export default function AdminSubmissionsPage() {
  const { apps, loading } = useAdminSubmissions()
  const [filter, setFilter] = useState<FilterStatus>('pending')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [reviewingApp, setReviewingApp] = useState<AppDoc | null>(null)

  const filtered =
    filter === 'all' ? apps : apps.filter((a) => a.status === filter)

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((a) => a.id)))
    }
  }

  const clearSelection = useCallback(() => setSelectedIds(new Set()), [])

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-0">
        {/* Title */}
        <div className="pb-5">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Submissions</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Review and moderate all submitted web apps.
          </p>
        </div>

        {/* Bulk action bar */}
        <BulkActionBar
          selectedIds={Array.from(selectedIds)}
          onClear={clearSelection}
        />

        {/* Filter tabs */}
        {!loading && apps.length > 0 && (
          <div className="flex gap-1 border-b border-border pb-px pt-1">
            {FILTERS.map(({ value, label }) => {
              const count =
                value === 'all' ? apps.length : apps.filter((a) => a.status === value).length
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => { setFilter(value); setSelectedIds(new Set()) }}
                  className={cn(
                    'relative -mb-px flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors',
                    filter === value
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {label}
                  {count > 0 && (
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                        filter === value
                          ? 'bg-accent/15 text-accent'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Select all bar */}
        {!loading && filtered.length > 1 && (
          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={toggleSelectAll}
              className="h-4 w-4 cursor-pointer rounded border-border accent-[var(--color-accent)]"
              aria-label="Select all"
            />
            <span className="text-xs text-muted-foreground">
              {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select all'}
            </span>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="space-y-3 pt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-2 pt-2">
            {filtered.map((app) => (
              <AdminSubmissionRow
                key={app.id}
                app={app}
                selected={selectedIds.has(app.id)}
                onSelect={toggleSelect}
                onReview={setReviewingApp}
              />
            ))}
          </div>
        ) : (
          <div className="pt-4">
            <EmptyDashboardState
              icon={Package}
              title={filter === 'all' ? 'No submissions yet' : `No ${filter} apps`}
              description={
                filter === 'all'
                  ? 'No apps have been submitted yet.'
                  : `There are no ${filter} apps right now.`
              }
            />
          </div>
        )}
      </div>

      <AppReviewDrawer
        app={reviewingApp}
        onClose={() => setReviewingApp(null)}
      />
    </>
  )
}
