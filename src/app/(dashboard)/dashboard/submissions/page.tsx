'use client'

import { useState } from 'react'
import { Package } from 'lucide-react'
import { SubmissionCard } from '@/components/dashboard/SubmissionCard'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { Button } from '@/components/ui/Button'
import { useUserSubmissions } from '@/hooks/useUserSubmissions'
import { cn } from '@/lib/utils/cn'
import type { AppStatus } from '@/types'

type FilterStatus = 'all' | Exclude<AppStatus, 'deleted'>

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export default function SubmissionsPage() {
  const { submissions, loading } = useUserSubmissions()
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filtered =
    filter === 'all' ? submissions : submissions.filter((s) => s.status === filter)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">My Submissions</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage all your submitted web apps.
          </p>
        </div>
        <Button href="/submit" size="md">
          + Submit App
        </Button>
      </div>

      {/* Filter tabs */}
      {!loading && submissions.length > 0 && (
        <div className="flex gap-1.5 border-b border-border pb-px">
          {FILTERS.map(({ value, label }) => {
            const count =
              value === 'all'
                ? submissions.length
                : submissions.filter((s) => s.status === value).length
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
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
                      filter === value ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground',
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

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((app) => (
            <SubmissionCard key={app.id} app={app} />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <EmptyDashboardState
          icon={Package}
          title="No submissions yet"
          description="Your submitted web apps will appear here once you submit one."
          action={{ label: 'Submit Your App', href: '/submit' }}
        />
      ) : (
        <EmptyDashboardState
          icon={Package}
          title={`No ${filter} submissions`}
          description={`You don't have any ${filter} submissions right now.`}
        />
      )}
    </div>
  )
}
