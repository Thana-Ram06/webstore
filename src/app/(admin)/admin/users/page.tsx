'use client'

import { useState } from 'react'
import { Users } from 'lucide-react'
import { UserRow } from '@/components/admin/UserRow'
import { EmptyDashboardState } from '@/components/dashboard/EmptyDashboardState'
import { useAdminUsers } from '@/hooks/useAdminUsers'
import { cn } from '@/lib/utils/cn'

type RoleFilter = 'all' | 'admin' | 'user'

export default function AdminUsersPage() {
  const { users, loading } = useAdminUsers()
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = users
    .filter((u) => roleFilter === 'all' || u.role === roleFilter)
    .filter((u) => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        u.displayName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      )
    })

  const adminCount = users.filter((u) => u.role === 'admin').length

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Users</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {loading ? '—' : `${users.length} total users · ${adminCount} admins`}
        </p>
      </div>

      {/* Search + filter */}
      {!loading && users.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className={cn(
              'flex-1 rounded-lg border border-border bg-card px-3.5 py-2 text-sm',
              'text-foreground placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'min-w-[200px]',
            )}
          />
          <div className="flex gap-1">
            {(['all', 'admin', 'user'] as RoleFilter[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  roleFilter === r
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((u) => (
            <UserRow key={u.id} profile={u} />
          ))}
        </div>
      ) : (
        <EmptyDashboardState
          icon={Users}
          title="No users found"
          description={search ? `No results for "${search}".` : 'No users have signed up yet.'}
        />
      )}
    </div>
  )
}
