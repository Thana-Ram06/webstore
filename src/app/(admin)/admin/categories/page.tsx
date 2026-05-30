'use client'

import { CategoryRow } from '@/components/admin/CategoryRow'
import { useAdminSubmissions } from '@/hooks/useAdminSubmissions'
import { CATEGORIES } from '@/lib/constants/categories'

export default function AdminCategoriesPage() {
  const { apps, loading } = useAdminSubmissions()

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    slug: cat.slug,
    apps: apps.filter((a) => a.categorySlug === cat.slug),
  })).sort((a, b) => b.apps.length - a.apps.length)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Categories</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {CATEGORIES.length} categories · app distribution across all categories.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {CATEGORIES.slice(0, 6).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {categoriesWithCounts.map(({ slug, apps: catApps }) => (
            <CategoryRow key={slug} slug={slug} apps={catApps} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Category CRUD management coming in a future update.
      </p>
    </div>
  )
}
