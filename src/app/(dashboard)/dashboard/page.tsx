'use client'

import { Package, CheckCircle2, Clock, XCircle, Heart } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { SubmissionCard } from '@/components/dashboard/SubmissionCard'
import { Button } from '@/components/ui/Button'
import { useUserSubmissions } from '@/hooks/useUserSubmissions'
import { useUserFavorites } from '@/hooks/useFavorite'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()
  const { submissions, loading: subLoading } = useUserSubmissions()
  const { favorites, loading: favLoading } = useUserFavorites()

  const approved = submissions.filter((s) => s.status === 'approved').length
  const pending = submissions.filter((s) => s.status === 'pending').length
  const rejected = submissions.filter((s) => s.status === 'rejected').length
  const recentSubmissions = submissions.slice(0, 3)
  const firstName = user?.displayName?.split(' ')[0]

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {firstName ? `Welcome back, ${firstName}` : 'Welcome back'}
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Here&apos;s an overview of your activity on AppVault.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard
          icon={Package}
          label="Total Submissions"
          value={subLoading ? '—' : submissions.length}
          accent
        />
        <StatsCard
          icon={CheckCircle2}
          label="Approved"
          value={subLoading ? '—' : approved}
        />
        <StatsCard
          icon={Clock}
          label="Pending Review"
          value={subLoading ? '—' : pending}
        />
        <StatsCard
          icon={XCircle}
          label="Rejected"
          value={subLoading ? '—' : rejected}
        />
        <StatsCard
          icon={Heart}
          label="Favorites"
          value={favLoading ? '—' : favorites.length}
        />
      </div>

      {/* Recent submissions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Recent Submissions</h3>
          {submissions.length > 3 && (
            <Button href="/dashboard/submissions" variant="ghost" size="sm">
              View all →
            </Button>
          )}
        </div>

        {subLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : recentSubmissions.length > 0 ? (
          <div className="space-y-3">
            {recentSubmissions.map((app) => (
              <SubmissionCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <EmptyDashboardState
            icon={Package}
            title="No submissions yet"
            description="Submit your first web app and start building your presence on AppVault."
            action={{ label: 'Submit Your App', href: '/submit' }}
          />
        )}
      </div>
    </div>
  )
}
