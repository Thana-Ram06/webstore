'use client'

import Link from 'next/link'
import {
  Sparkles, Zap, Code2, Palette, Megaphone,
  DollarSign, BarChart2, Users, Blocks, BookOpen,
  GitFork, Shield, Check, TrendingUp, Clock,
  Star, Heart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants/categories'
import { buildBrowseUrl } from '@/lib/utils/browse'
import { cn } from '@/lib/utils/cn'
import type { BrowseFilters, SortOption } from '@/types/browse'

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Zap, Code2, Palette, Megaphone,
  DollarSign, BarChart2, Users, Blocks, BookOpen,
  Github: GitFork, Shield,
}

const PRICING_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'open-source', label: 'Open Source' },
] as const

const PLATFORM_OPTIONS = [
  { value: 'web', label: 'Web' },
  { value: 'pwa', label: 'PWA' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'extension', label: 'Extension' },
] as const

const SORT_OPTIONS: Array<{ value: SortOption; label: string; icon: LucideIcon }> = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'top-rated', label: 'Top Rated', icon: Star },
  { value: 'most-favorited', label: 'Most Favorited', icon: Heart },
]

interface FilterSidebarProps {
  filters: BrowseFilters
  categoryCounts?: Record<string, number>
  pricingCounts?: Record<string, number>
  className?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="my-4 border-t border-border" />
}

export function FilterSidebar({ filters, categoryCounts = {}, pricingCounts = {}, className }: FilterSidebarProps) {
  const currentSort = filters.sort ?? 'trending'

  return (
    <nav className={cn('flex flex-col', className)} aria-label="Browse filters">
      {/* ── Categories ─────────────────────────────────── */}
      <SectionLabel>Categories</SectionLabel>
      <div className="space-y-0.5">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName]
          const isActive = filters.category === cat.slug
          const next = isActive
            ? { ...filters, category: undefined }
            : { ...filters, category: cat.slug as BrowseFilters['category'] }
          const count = categoryCounts[cat.slug] ?? 0

          return (
            <Link
              key={cat.slug}
              href={buildBrowseUrl(next)}
              className={cn(
                'group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150',
                isActive
                  ? 'bg-accent-subtle font-medium text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors"
                style={{
                  backgroundColor: `${cat.accentColor}${isActive ? '28' : '15'}`,
                  color: cat.accentColor,
                }}
              >
                {Icon && <Icon className="h-3 w-3" aria-hidden />}
              </div>
              <span className="flex-1 truncate">{cat.name}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'tabular-nums text-xs',
                    isActive ? 'text-accent/60' : 'text-muted-foreground/40',
                  )}
                >
                  {count}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <Divider />

      {/* ── Pricing ────────────────────────────────────── */}
      <SectionLabel>Pricing</SectionLabel>
      <div className="space-y-0.5">
        {PRICING_OPTIONS.map(({ value, label }) => {
          const isActive = filters.pricing === value
          const next = isActive
            ? { ...filters, pricing: undefined }
            : { ...filters, pricing: value as BrowseFilters['pricing'] }
          const count = pricingCounts[value] ?? 0

          return (
            <Link
              key={value}
              href={buildBrowseUrl(next)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150',
                isActive
                  ? 'bg-accent-subtle font-medium text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <div
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded',
                  isActive ? 'bg-accent' : 'border border-border bg-card',
                )}
              >
                {isActive && <Check className="h-2.5 w-2.5 text-white" aria-hidden />}
              </div>
              <span className="flex-1">{label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'tabular-nums text-xs',
                    isActive ? 'text-accent/60' : 'text-muted-foreground/40',
                  )}
                >
                  {count}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <Divider />

      {/* ── Platform ───────────────────────────────────── */}
      <SectionLabel>Platform</SectionLabel>
      <div className="space-y-0.5">
        {PLATFORM_OPTIONS.map(({ value, label }) => {
          const isActive = filters.platform === value
          const next = isActive
            ? { ...filters, platform: undefined }
            : { ...filters, platform: value as BrowseFilters['platform'] }

          return (
            <Link
              key={value}
              href={buildBrowseUrl(next)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150',
                isActive
                  ? 'bg-accent-subtle font-medium text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <div
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded',
                  isActive ? 'bg-accent' : 'border border-border bg-card',
                )}
              >
                {isActive && <Check className="h-2.5 w-2.5 text-white" aria-hidden />}
              </div>
              <span className="flex-1">{label}</span>
            </Link>
          )
        })}
      </div>

      <Divider />

      {/* ── Sort ───────────────────────────────────────── */}
      <SectionLabel>Sort by</SectionLabel>
      <div className="space-y-0.5">
        {SORT_OPTIONS.map(({ value, label, icon: Icon }) => {
          const isActive = currentSort === value
          const next = { ...filters, sort: value }

          return (
            <Link
              key={value}
              href={buildBrowseUrl(next)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150',
                isActive
                  ? 'bg-accent-subtle font-medium text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon
                className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-accent' : 'text-muted-foreground/50')}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
