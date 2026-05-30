import { Container } from '@/components/layout/Container'

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />
}

export default function AppDetailLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="border-b border-border bg-background/95">
        <Container className="py-8 sm:py-10">
          <div className="flex items-start gap-5 sm:gap-6">
            <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
          <Skeleton className="mt-5 h-3 w-56" />
        </Container>
      </div>

      {/* Content skeleton */}
      <Container className="py-8">
        <div className="flex gap-8">
          <div className="min-w-0 flex-1 space-y-10">
            {/* Gallery skeleton */}
            <Skeleton className="aspect-video w-full rounded-xl" />

            {/* About skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Reviews skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
                <div className="pt-2 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <Skeleton className="h-4 w-16" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-3.5 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
