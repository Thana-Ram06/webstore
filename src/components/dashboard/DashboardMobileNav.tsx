'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Heart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/submissions', label: 'Submissions', icon: Package },
  { href: '/dashboard/favorites', label: 'Favorites', icon: Heart },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      aria-label="Mobile dashboard navigation"
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
            <Icon
              className={cn('h-5 w-5', active && 'scale-110 transition-transform')}
              aria-hidden
            />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
