'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  exact?: boolean
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, exact = false, className, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-150',
        isActive
          ? 'text-foreground font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
        className,
      )}
    >
      {isActive && (
        <span
          className="absolute inset-x-2 bottom-0.5 h-px rounded-full bg-accent opacity-70"
          aria-hidden
        />
      )}
      {children}
    </Link>
  )
}
