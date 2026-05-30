'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Menu, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { UserMenu } from '@/components/auth/UserMenu'
import { SearchInput } from '@/components/nav/SearchInput'
import { NavLink } from '@/components/nav/NavLink'
import { MobileMenu } from '@/components/nav/MobileMenu'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const { user, loading } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll detection — passive listener for performance
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full',
          'transition-all duration-200 ease-in-out',
          scrolled
            ? 'border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-background/60 backdrop-blur-md',
        )}
      >
        <Container>
          <div className="flex h-16 items-center gap-3">

            {/* ── Brand ── */}
            <Brand />

            {/* ── Search — hidden on mobile, shown md+ ── */}
            <div className="mx-4 hidden w-full max-w-[280px] flex-1 lg:block xl:max-w-sm">
              <SearchInput />
            </div>

            {/* ── Desktop nav links ── */}
            <nav className="ml-1 hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
              <NavLink href="/apps">Browse</NavLink>
              <NavLink href="/categories">Categories</NavLink>
            </nav>

            {/* ── Right actions ── */}
            <div className="ml-auto flex items-center gap-1.5">

              {/* Submit — always visible on sm+ */}
              <Link
                href="/submit"
                className={cn(
                  'hidden items-center gap-1.5 rounded-full sm:flex',
                  'bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground',
                  'transition-colors duration-150 hover:bg-accent-hover',
                )}
              >
                <Plus className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:block">Submit App</span>
              </Link>

              {/* Desktop-only: theme + auth */}
              <div className="hidden items-center gap-1.5 md:flex">
                <ThemeToggle />

                {loading ? (
                  <div
                    className="h-8 w-8 animate-pulse rounded-full bg-muted"
                    aria-hidden
                  />
                ) : user ? (
                  <div className="flex items-center gap-1">
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-3 py-1.5',
                          'text-xs font-medium text-accent',
                          'transition-colors hover:bg-accent-subtle',
                        )}
                        aria-label="Admin panel"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                        <span className="hidden lg:block">Admin</span>
                      </Link>
                    )}
                    <UserMenu />
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className={cn(
                      'rounded-full border border-border px-3.5 py-1.5',
                      'text-sm font-medium text-foreground',
                      'transition-colors duration-150 hover:bg-muted',
                    )}
                  >
                    Sign in
                  </Link>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg md:hidden',
                  'text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                )}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>

          </div>

          {/* Mobile search bar — shown below main row on sm, hidden on lg+ */}
          <div className="border-t border-border/40 pb-3 pt-2.5 lg:hidden">
            <SearchInput />
          </div>
        </Container>
      </header>

      {/* Mobile drawer — outside header so it overlays correctly */}
      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  )
}

function Brand() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-85"
      aria-label="WebsTore — The Home of Modern Web Apps"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
          <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
          <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
          <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">WebsTore</span>
    </Link>
  )
}
