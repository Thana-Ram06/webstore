import Link from 'next/link'
import { PackageSearch } from 'lucide-react'

interface EmptyStateProps {
  hasFilters: boolean
  query?: string
}

export function EmptyState({ hasFilters, query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <PackageSearch className="h-7 w-7 text-muted-foreground/50" aria-hidden />
      </div>

      <h3 className="mt-5 text-base font-semibold text-foreground">
        {query ? `No results for "${query}"` : 'No apps found'}
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        {hasFilters
          ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
          : 'No apps match the current criteria.'}
      </p>

      {hasFilters && (
        <Link
          href="/apps"
          className="mt-5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Clear all filters
        </Link>
      )}
    </div>
  )
}
