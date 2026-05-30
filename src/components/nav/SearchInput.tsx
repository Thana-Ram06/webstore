'use client'

import { useRef, useEffect, useState, useCallback, useId } from 'react'
import { Search, X, Loader2, Command } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SearchInputProps {
  placeholder?: string
  className?: string
}

function useIsMac() {
  const [isMac] = useState(
    () => typeof window !== 'undefined' && navigator.platform.toUpperCase().includes('MAC'),
  )
  return isMac
}

export function SearchInput({ placeholder = 'Search web apps, tools…', className }: SearchInputProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [loading] = useState(false) // reserved for Algolia
  const isMac = useIsMac()

  const open = focused

  // Global '/' shortcut to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      // ⌘K / Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close panel on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const clear = useCallback(() => {
    setValue('')
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (value) {
        setValue('')
      } else {
        inputRef.current?.blur()
        setFocused(false)
      }
    }
  }, [value])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Input pill */}
      <div
        className={cn(
          'flex items-center gap-2 rounded-full',
          'border bg-muted px-3.5 py-2 transition-all duration-200',
          open
            ? 'border-ring/40 bg-card shadow-sm ring-2 ring-ring/20'
            : 'border-border hover:border-muted-foreground/25',
        )}
      >
        {/* Search icon / spinner */}
        <span className="shrink-0 text-muted-foreground" aria-hidden>
          {loading
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <Search className="h-3.5 w-3.5" />
          }
        </span>

        <input
          ref={inputRef}
          id={id}
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search web apps"
          aria-autocomplete="list"
          className={cn(
            'min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none',
            'placeholder:text-muted-foreground',
            '[&::-webkit-search-cancel-button]:hidden',
          )}
        />

        {/* Right slot: clear or shortcut hint */}
        {value ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        ) : !focused ? (
          <kbd
            aria-hidden
            className="hidden shrink-0 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground/60 lg:flex"
          >
            {isMac ? <Command className="h-2.5 w-2.5" /> : null}
            {isMac ? 'K' : '/'}
          </kbd>
        ) : null}
      </div>

      {/* Results panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Search results"
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-2',
            'rounded-xl border border-border bg-card shadow-lg',
            'overflow-hidden',
          )}
        >
          {value ? (
            /* Loading */
            loading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span>Searching…</span>
              </div>
            ) : (
              /* Empty state — no results yet (no Algolia) */
              <div className="flex flex-col items-center gap-1.5 px-4 py-10 text-center">
                <Search className="h-8 w-8 text-muted-foreground/30" aria-hidden />
                <p className="text-sm font-medium text-foreground">No results for &ldquo;{value}&rdquo;</p>
                <p className="text-xs text-muted-foreground">Search powered by Algolia — coming soon</p>
              </div>
            )
          ) : (
            /* Idle state */
            <div className="px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick access</p>
              <div className="mt-2 space-y-0.5">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setFocused(false)}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Footer hint */}
          <div className="flex items-center gap-3 border-t border-border px-3 py-2">
            <span className="text-[11px] text-muted-foreground/50">
              <kbd className="rounded border border-border px-1 py-0.5 font-sans text-[10px]">↑↓</kbd>
              {' '}navigate
            </span>
            <span className="text-[11px] text-muted-foreground/50">
              <kbd className="rounded border border-border px-1 py-0.5 font-sans text-[10px]">↵</kbd>
              {' '}open
            </span>
            <span className="text-[11px] text-muted-foreground/50">
              <kbd className="rounded border border-border px-1 py-0.5 font-sans text-[10px]">esc</kbd>
              {' '}close
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

const QUICK_LINKS = [
  { href: '/apps', label: 'Browse Web Apps', icon: '⊞' },
  { href: '/categories', label: 'All Categories', icon: '⊟' },
  { href: '/apps?sort=newest', label: 'New Arrivals', icon: '✦' },
  { href: '/apps?sort=top-rated', label: 'Top Rated', icon: '★' },
]
