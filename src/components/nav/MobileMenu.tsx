'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, LayoutGrid, Tag, Plus, LayoutDashboard, Heart, Settings, ShieldCheck, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, loading, signIn, signOut } = useAuth()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  async function handleSignOut() {
    onClose()
    await signOut()
  }

  async function handleSignIn() {
    onClose()
    await signIn()
  }

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-background/60 backdrop-blur-sm',
          'transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-card',
          'border-l border-border shadow-lg',
          'transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
            aria-label="WebsTore home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
                <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
                <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
                <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground">WebsTore</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-5">

          {/* Main navigation */}
          <nav aria-label="Main navigation">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Discover
            </p>
            <div className="space-y-0.5">
              <MobileNavItem href="/apps" icon={<LayoutGrid className="h-4 w-4" />} onClick={onClose}>
                Browse Web Apps
              </MobileNavItem>
              <MobileNavItem href="/categories" icon={<Tag className="h-4 w-4" />} onClick={onClose}>
                Categories
              </MobileNavItem>
            </div>
          </nav>

          <div className="my-4 border-t border-border" />

          {/* Submit CTA */}
          <Link
            href="/submit"
            onClick={onClose}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl',
              'bg-accent py-2.5 text-sm font-medium text-accent-foreground',
              'transition-colors hover:bg-accent-hover',
            )}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Submit a Web App
          </Link>

          <div className="my-4 border-t border-border" />

          {/* Auth section */}
          {loading ? (
            <div className="space-y-2">
              <div className="h-10 animate-pulse rounded-xl bg-muted" />
              <div className="h-10 animate-pulse rounded-xl bg-muted" />
            </div>
          ) : user ? (
            <>
              {/* User info */}
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
                <Avatar src={user.photoURL} name={user.displayName} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{user.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="space-y-0.5">
                <MobileNavItem href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} onClick={onClose}>
                  Dashboard
                </MobileNavItem>
                <MobileNavItem href="/favorites" icon={<Heart className="h-4 w-4" />} onClick={onClose}>
                  Favorites
                </MobileNavItem>
                <MobileNavItem href="/settings" icon={<Settings className="h-4 w-4" />} onClick={onClose}>
                  Settings
                </MobileNavItem>
                {user.role === 'admin' && (
                  <MobileNavItem href="/admin" icon={<ShieldCheck className="h-4 w-4" />} onClick={onClose} accent>
                    Admin Panel
                  </MobileNavItem>
                )}
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5',
                    'text-sm text-destructive transition-colors hover:bg-destructive/10',
                  )}
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSignIn}
                className={cn(
                  'flex w-full items-center justify-center rounded-xl border border-border',
                  'py-2.5 text-sm font-medium text-foreground',
                  'transition-colors hover:bg-muted',
                )}
              >
                Sign in with Google
              </button>
              <Link
                href="/signup"
                onClick={onClose}
                className={cn(
                  'flex w-full items-center justify-center rounded-xl',
                  'bg-accent py-2.5 text-sm font-medium text-accent-foreground',
                  'transition-colors hover:bg-accent-hover',
                )}
              >
                Create account
              </Link>
            </div>
          )}
        </div>

        {/* Footer — theme toggle */}
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}

interface MobileNavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  accent?: boolean
}

function MobileNavItem({ href, icon, children, onClick, accent = false }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5',
        'text-sm transition-colors hover:bg-muted',
        accent ? 'text-accent' : 'text-foreground',
      )}
    >
      <span className={cn('shrink-0', accent ? 'text-accent' : 'text-muted-foreground')} aria-hidden>
        {icon}
      </span>
      {children}
    </Link>
  )
}
