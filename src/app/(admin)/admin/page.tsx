'use client'

import { Package, CheckCircle2, Clock, XCircle, Users, Star } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { AdminSubmissionRow } from '@/components/admin/AdminSubmissionRow'
import { AppReviewDrawer } from '@/components/admin/AppReviewDrawer'
import { Button } from '@/components/ui/Button'
import { useAdminSubmissions } from '@/hooks/useAdminSubmissions'
import { useAdminUsers } from '@/hooks/useAdminUsers'
import { useState } from 'react'
import type { AppDoc } from '@/types'

export default function AdminOverviewPage() {
  const { apps, loading: appsLoading } = useAdminSubmissions()
  const { users, loading: usersLoading } = useAdminUsers()
  const [reviewingApp, setReviewingApp] = useState<AppDoc | null>(null)

  const pending = apps.filter((a) => a.status === 'pending')
  const approved = apps.filter((a) => a.status === 'approved')
  const rejected = apps.filter((a) => a.status === 'rejected')
  const featured = apps.filter((a) => a.isFeatured)

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Admin Overview</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Platform health at a glance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatsCard
            icon={Package}
            label="Total Apps"
            value={appsLoading ? '—' : apps.length}
            accent
          />
          <StatsCard
            icon={Clock}
            label="Pending Review"
            value={appsLoading ? '—' : pending.length}
          />
          <StatsCard
            icon={CheckCircle2}
            label="Approved"
            value={appsLoading ? '—' : approved.length}
          />
          <StatsCard
            icon={XCircle}
            label="Rejected"
            value={appsLoading ? '—' : rejected.length}
          />
          <StatsCard
            icon={Users}
            label="Total Users"
            value={usersLoading ? '—' : users.length}
          />
          <StatsCard
            icon={Star}
            label="Featured Apps"
            value={appsLoading ? '—' : featured.length}
          />
        </div>

        {/* Pending queue */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Pending Review
              {pending.length > 0 && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {pending.length}
                </span>
              )}
            </h3>
            {pending.length > 5 && (
              <Button href="/admin/submissions" variant="ghost" size="sm">
                View all →
              </Button>
            )}
          </div>

          {appsLoading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : pending.length > 0 ? (
            <div className="space-y-2">
              {pending.slice(0, 5).map((app) => (
                <AdminSubmissionRow
                  key={app.id}
                  app={app}
                  selected={false}
                  onSelect={() => {}}
                  onReview={setReviewingApp}
                />
              ))}
            </div>
          ) : (
            <EmptyDashboardState
              icon={CheckCircle2}
              title="Queue is clear"
              description="No apps pending review. Nice work!"
            />
          )}
        </div>
      </div>

      <AppReviewDrawer
        app={reviewingApp}
        onClose={() => setReviewingApp(null)}
      />
    </>
  )
}
