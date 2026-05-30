'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, Users, Grid3x3, Settings,
  ExternalLink, LogOut, ShieldCheck,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/submissions', label: 'Submissions', icon: Package },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/categories', label: 'Categories', icon: Grid3x3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
            <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
          </svg>
        </span>
        <div className="min-w-0">
          <span className="text-sm font-semibold text-foreground">WebsTore</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-2.5 w-2.5 text-accent" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Utility links */}
      <div className="space-y-0.5 border-t border-border p-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          User Dashboard
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          Sign out
        </button>
      </div>

      {/* User identity */}
      {user && (
        <div className="flex items-center gap-3 border-t border-border p-4">
          <Avatar src={user.photoURL} name={user.displayName || user.email} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user.displayName || 'Admin'}
            </p>
            <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-accent">
              Administrator
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
