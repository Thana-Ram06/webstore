'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { buildBrowseUrl } from '@/lib/utils/browse'
import type { BrowseFilters } from '@/types/browse'

interface BrowseSearchBarProps {
  filters: BrowseFilters
}

export function BrowseSearchBar({ filters }: BrowseSearchBarProps) {
  const router = useRouter()
  const [value, setValue] = useState(filters.q ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Sync when the server changes filters (e.g., chip removal clears q)
  useEffect(() => {
    setValue(filters.q ?? '')
  }, [filters.q])

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setValue(v)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      router.replace(buildBrowseUrl({ ...filters, q: v.trim() || undefined }), {
        scroll: false,
      })
    }, 350)
  }

  function handleClear() {
    setValue('')
    clearTimeout(timerRef.current)
    router.replace(buildBrowseUrl({ ...filters, q: undefined }), { scroll: false })
  }

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search web apps…"
        aria-label="Search web apps"
        className={cn(
          'h-12 w-full rounded-xl border border-border bg-card pl-11 pr-10',
          'text-sm text-foreground placeholder:text-muted-foreground/55',
          'shadow-sm transition-all duration-200',
          'focus:border-accent/40 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring/20',
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      )}
    </div>
  )
}
