import { Skeleton } from '@/components/ui/Skeleton'
import { Container } from '@/components/layout/Container'
import { WebAppCardGridSkeleton } from '@/components/cards'
import { cn } from '@/lib/utils/cn'

export function BrowseSkeleton() {
  return (
    <Container className="py-8">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <aside className="hidden w-64 shrink-0 space-y-1 lg:block xl:w-72">
          <Skeleton className="mb-4 h-3 w-20 rounded" />
          {Array.from({ length: 12 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
          <div className="my-4 border-t border-border" />
          <Skeleton className="mb-4 h-3 w-16 rounded" />
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </aside>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1">
          <Skeleton className={cn('mb-5 h-12 w-full rounded-xl')} />
          <Skeleton className="mb-6 h-4 w-28 rounded" />
          <WebAppCardGridSkeleton count={12} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </div>
    </Container>
  )
}
