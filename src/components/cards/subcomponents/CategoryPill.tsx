'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants/categories'
import { cn } from '@/lib/utils/cn'
import type { CategorySlug } from '@/types'

const categoryMap = new Map(CATEGORIES.map((c) => [c.slug, c]))

interface CategoryPillProps {
  slug: CategorySlug
  interactive?: boolean
  className?: string
}

export function CategoryPill({ slug, interactive = false, className }: CategoryPillProps) {
  const cat = categoryMap.get(slug)
  const label = cat?.name ?? slug

  const classes = cn(
    'inline-flex items-center rounded-full px-2 py-0.5',
    'text-[11px] font-medium text-muted-foreground',
    'bg-muted',
    interactive && 'transition-colors hover:bg-muted/80 hover:text-foreground',
    className,
  )

  if (interactive) {
    return (
      <Link
        href={`/apps?category=${slug}`}
        className={classes}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </Link>
    )
  }

  return <span className={classes}>{label}</span>
}
