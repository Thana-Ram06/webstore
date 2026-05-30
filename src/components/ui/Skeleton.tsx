import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Base Skeleton
   ───────────────────────────────────────── */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'rect' = rounded rectangle (default), 'circle' = fully round */
  shape?: 'rect' | 'circle'
}

function Skeleton({ shape = 'rect', className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      aria-hidden
      {...props}
    />
  )
}

/* ─────────────────────────────────────────
   Skeleton.Text — one or more text lines
   ───────────────────────────────────────── */
interface SkeletonTextProps {
  lines?: number
  className?: string
  /** Whether to shorten the last line (mimics real paragraph text) */
  shortenLast?: boolean
}

function SkeletonText({ lines = 1, className, shortenLast = true }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            shortenLast && lines > 1 && i === lines - 1 ? 'w-3/4' : 'w-full',
          )}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Skeleton.AppCard — matches AppCard layout
   ───────────────────────────────────────── */
function SkeletonAppCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4',
        className,
      )}
      aria-hidden
    >
      {/* Header row: icon + name + category */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      {/* Tagline */}
      <div className="mt-3 space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      {/* Footer row: stars + pricing */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Skeleton.CategoryCard
   ───────────────────────────────────────── */
function SkeletonCategoryCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5',
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="h-9 w-9" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Named exports
   ───────────────────────────────────────── */
export { Skeleton, SkeletonText, SkeletonAppCard, SkeletonCategoryCard }
export type { SkeletonProps }
