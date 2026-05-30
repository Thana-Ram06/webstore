'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Trash2 } from 'lucide-react'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { deleteSubmission } from '@/lib/actions/deleteSubmission'
import { CATEGORIES } from '@/lib/constants/categories'
import { cn } from '@/lib/utils/cn'
import type { AppDoc, AppStatus } from '@/types'

const STATUS_STYLES: Record<Exclude<AppStatus, 'deleted'>, string> = {
  pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected:
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const STATUS_LABELS: Record<Exclude<AppStatus, 'deleted'>, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

function formatDate(ts: AppDoc['createdAt']): string {
  try {
    const date = ts && typeof (ts as { toDate?: () => Date }).toDate === 'function'
      ? (ts as { toDate: () => Date }).toDate()
      : new Date(ts as unknown as string)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return '—'
  }
}

function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug
}

interface SubmissionCardProps {
  app: AppDoc
}

export function SubmissionCard({ app }: SubmissionCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const statusKey = app.status as Exclude<AppStatus, 'deleted'>
  const statusStyle = STATUS_STYLES[statusKey] ?? STATUS_STYLES.pending
  const statusLabel = STATUS_LABELS[statusKey] ?? 'Unknown'

  async function handleDelete() {
    if (deleting) return
    setDeleting(true)
    try {
      await deleteSubmission(app.id)
      setDeleted(true)
    } catch {
      setDeleting(false)
    }
  }

  if (deleted) return null

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-xl border border-border bg-card p-4',
        'transition-opacity',
        deleting && 'opacity-50',
      )}
    >
      <AppLogo src={app.logoUrl} name={app.name} size="md" className="shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{app.name}</p>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold',
              statusStyle,
            )}
          >
            {statusLabel}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
          <span>{getCategoryName(app.categorySlug)}</span>
          <span aria-hidden>·</span>
          <span>Submitted {formatDate(app.createdAt)}</span>
        </div>
        {app.status === 'rejected' && app.rejectionReason && (
          <p className="mt-1.5 text-xs text-destructive/80">{app.rejectionReason}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {app.status === 'approved' && (
          <Link
            href={`/apps/${app.slug}`}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground',
              'transition-colors hover:bg-muted hover:text-foreground',
            )}
            aria-label={`View ${app.name}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground',
            'transition-colors hover:bg-destructive/10 hover:text-destructive',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          aria-label={`Delete ${app.name}`}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
