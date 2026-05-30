import { CATEGORIES } from '@/lib/constants/categories'
import type { AppDoc } from '@/types'

interface CategoryRowProps {
  slug: string
  apps: AppDoc[]
}

export function CategoryRow({ slug, apps }: CategoryRowProps) {
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) return null

  const total = apps.length
  const approved = apps.filter((a) => a.status === 'approved').length
  const pending = apps.filter((a) => a.status === 'pending').length

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3">
      <div
        className="h-9 w-9 shrink-0 rounded-lg"
        style={{ backgroundColor: `${category.accentColor}20` }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-lg"
          style={{ color: category.accentColor }}
        >
          <span className="text-xs font-bold">
            {category.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{category.name}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{category.description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-right">
        <div>
          <p className="text-sm font-bold tabular-nums text-foreground">{total}</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </div>
        <div>
          <p className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{approved}</p>
          <p className="text-[10px] text-muted-foreground">Live</p>
        </div>
        {pending > 0 && (
          <div>
            <p className="text-sm font-bold tabular-nums text-amber-600 dark:text-amber-400">{pending}</p>
            <p className="text-[10px] text-muted-foreground">Pending</p>
          </div>
        )}
      </div>
    </div>
  )
}
