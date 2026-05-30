import { X } from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants/categories'
import { buildBrowseUrl } from '@/lib/utils/browse'
import type { BrowseFilters } from '@/types/browse'

const PRICING_LABELS: Record<string, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'open-source': 'Open Source',
}

const PLATFORM_LABELS: Record<string, string> = {
  web: 'Web',
  pwa: 'PWA',
  desktop: 'Desktop',
  extension: 'Extension',
}

interface ActiveFiltersProps {
  filters: BrowseFilters
}

export function ActiveFilters({ filters }: ActiveFiltersProps) {
  const chips: Array<{ key: keyof BrowseFilters; label: string }> = []

  if (filters.category) {
    const cat = CATEGORIES.find((c) => c.slug === filters.category)
    chips.push({ key: 'category', label: cat?.name ?? filters.category })
  }
  if (filters.pricing) {
    chips.push({ key: 'pricing', label: PRICING_LABELS[filters.pricing] ?? filters.pricing })
  }
  if (filters.platform) {
    chips.push({ key: 'platform', label: PLATFORM_LABELS[filters.platform] ?? filters.platform })
  }
  if (filters.featured) {
    chips.push({ key: 'featured', label: 'Featured' })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {chips.map(({ key, label }) => {
        const next = { ...filters, [key]: undefined }
        return (
          <Link
            key={key}
            href={buildBrowseUrl(next)}
            className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-subtle px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent-subtle/80"
          >
            {label}
            <X className="h-3 w-3" aria-hidden />
          </Link>
        )
      })}

      <Link
        href="/apps"
        className="ml-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Clear all
      </Link>
    </div>
  )
}
