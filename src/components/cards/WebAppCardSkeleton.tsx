import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   WebAppCard skeleton
   ───────────────────────────────────────── */
export function WebAppCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-border bg-card p-4',
        className,
      )}
      aria-hidden
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-1.5 pt-0.5">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/3 rounded-full" />
        </div>
        <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
      </div>
      {/* Tagline */}
      <div className="mt-3 space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      {/* Footer */}
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="ml-auto h-5 w-16 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FeaturedWebAppCard skeleton
   ───────────────────────────────────────── */
export function FeaturedWebAppCardSkeleton({ className, hero = false }: { className?: string; hero?: boolean }) {
  return (
    <div
      className={cn('overflow-hidden rounded-2xl border border-border bg-card', className)}
      aria-hidden
    >
      {/* Image area */}
      <Skeleton className={cn('w-full rounded-none', hero ? 'aspect-[21/9]' : 'aspect-[16/9]')} />
      {/* Content */}
      <div className={cn(hero ? 'p-6' : 'p-5')}>
        <div className="flex items-start gap-4">
          <Skeleton className="h-14 w-14 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2 pt-0.5">
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CompactWebAppCard skeleton
   ───────────────────────────────────────── */
export function CompactWebAppCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5',
        className,
      )}
      aria-hidden
    >
      <Skeleton className="mt-0.5 h-9 w-9 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Grid skeleton — renders N card skeletons
   ───────────────────────────────────────── */
export function WebAppCardGridSkeleton({
  count = 6,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
      aria-busy="true"
      aria-label="Loading web apps"
    >
      {Array.from({ length: count }, (_, i) => (
        <WebAppCardSkeleton key={i} />
      ))}
    </div>
  )
}
