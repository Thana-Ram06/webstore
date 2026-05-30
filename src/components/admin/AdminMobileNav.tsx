'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Users, Grid3x3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/submissions', label: 'Submissions', icon: Package },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/categories', label: 'Categories', icon: Grid3x3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminMobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      aria-label="Mobile admin navigation"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2',
              'text-[10px] font-medium transition-colors',
              active ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className={cn('h-5 w-5', active && 'scale-110')} aria-hidden />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
