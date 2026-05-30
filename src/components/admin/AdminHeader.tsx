'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Overview',
  '/admin/submissions': 'Submissions',
  '/admin/users': 'Users',
  '/admin/categories': 'Categories',
  '/admin/settings': 'Settings',
}

export function AdminHeader() {
  const { user } = useAuth()
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Admin'

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-md sm:px-6">
      {/* Brand mark — mobile only */}
      <Link href="/admin" className="lg:hidden" aria-label="Admin home">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
            <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
          </svg>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <ShieldCheck className="hidden h-4 w-4 text-accent lg:block" aria-hidden />
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        {user && (
          <Avatar
            src={user.photoURL}
            name={user.displayName || user.email}
            size="sm"
            className="ring-1 ring-border"
          />
        )}
      </div>
    </header>
  )
}
