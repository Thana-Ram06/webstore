import { Star, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { MockReview } from '@/types/detail'

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sz = size === 'md' ? 'h-4 w-4' : 'h-3 w-3'
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sz,
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted',
          )}
          aria-hidden
        />
      ))}
    </span>
  )
}

function formatReviewDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

interface ReviewsPreviewProps {
  reviews: MockReview[]
  appSlug: string
  totalCount: number
  averageRating: number
}

export function ReviewsPreview({
  reviews,
  totalCount,
  averageRating,
}: ReviewsPreviewProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">User Reviews</h2>
          <div className="mt-1 flex items-center gap-2">
            <StarRow rating={Math.round(averageRating)} size="md" />
            <span className="text-sm font-semibold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({totalCount >= 1000 ? `${(totalCount / 1000).toFixed(1)}k` : totalCount} reviews)
            </span>
          </div>
        </div>
        <button
          disabled
          title="Review system coming soon"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
        >
          Write a Review
        </button>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {review.userName.trim()[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {review.userName}
                      </span>
                      {review.isVerified && (
                        <BadgeCheck
                          className="h-3.5 w-3.5 text-accent"
                          aria-label="Verified user"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRow rating={review.rating} />
                      <span className="text-[11px] text-muted-foreground">
                        {formatReviewDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="mt-3 text-sm font-semibold text-foreground">{review.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>

              {review.helpfulCount > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {review.helpfulCount} people found this helpful
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {/* View all link — placeholder until review system is built */}
      {totalCount > reviews.length && (
        <div className="mt-4">
          <span className="text-sm text-muted-foreground/60">
            {totalCount - reviews.length} more reviews coming in a future update
          </span>
        </div>
      )}
    </div>
  )
}
