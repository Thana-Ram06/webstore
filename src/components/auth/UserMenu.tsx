'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, LayoutDashboard, Heart, Settings, ShieldCheck, LogOut } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  async function handleSignOut() {
    setSigningOut(true)
    setOpen(false)
    try {
      await signOut()
    } finally {
      setSigningOut(false)
    }
  }

  if (!user) return null

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'flex items-center gap-1.5 rounded-full p-0.5 pr-2',
          'transition-colors hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        )}
      >
        <Avatar
          src={user.photoURL}
          name={user.displayName}
          size="sm"
        />
        <span className="hidden max-w-[100px] truncate text-sm font-medium text-foreground md:block">
          {user.displayName.split(' ')[0]}
        </span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-150', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className={cn(
            'absolute right-0 top-full z-50 mt-2 w-56',
            'rounded-xl border border-border bg-card shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-100',
          )}
        >
          {/* User info */}
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">{user.displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>

          {/* Nav items */}
          <div className="p-1">
            <MenuItem href="/dashboard" icon={<LayoutDashboard className="h-3.5 w-3.5" />} onClick={() => setOpen(false)}>
              Dashboard
            </MenuItem>
            <MenuItem href="/dashboard/favorites" icon={<Heart className="h-3.5 w-3.5" />} onClick={() => setOpen(false)}>
              Favorites
            </MenuItem>
            <MenuItem href="/dashboard/settings" icon={<Settings className="h-3.5 w-3.5" />} onClick={() => setOpen(false)}>
              Settings
            </MenuItem>

            {user.role === 'admin' && (
              <>
                <div className="my-1 border-t border-border" />
                <MenuItem
                  href="/admin"
                  icon={<ShieldCheck className="h-3.5 w-3.5" />}
                  onClick={() => setOpen(false)}
                  className="text-accent"
                >
                  Admin Panel
                </MenuItem>
              </>
            )}
          </div>

          {/* Sign out */}
          <div className="border-t border-border p-1">
            <button
              role="menuitem"
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2',
                'text-sm text-destructive',
                'transition-colors hover:bg-destructive/10',
                'disabled:opacity-50',
              )}
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function MenuItem({ href, icon, children, onClick, className }: MenuItemProps) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-2',
        'text-sm text-foreground',
        'transition-colors hover:bg-muted',
        className,
      )}
    >
      <span className="text-muted-foreground" aria-hidden>{icon}</span>
      {children}
    </Link>
  )
}
