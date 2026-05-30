'use client'

import { useState } from 'react'
import { Check, X, Star, Eye } from 'lucide-react'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { moderateApp } from '@/lib/actions/moderateApp'
import { featureApp } from '@/lib/actions/featureApp'
import { CATEGORIES } from '@/lib/constants/categories'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'
import type { AppDoc, AppStatus } from '@/types'

const STATUS_STYLES: Record<Exclude<AppStatus, 'deleted'>, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

function formatDate(ts: AppDoc['createdAt']): string {
  try {
    const d = ts && typeof (ts as { toDate?: () => Date }).toDate === 'function'
      ? (ts as { toDate: () => Date }).toDate()
      : new Date(ts as unknown as string)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return '—' }
}

interface AdminSubmissionRowProps {
  app: AppDoc
  selected: boolean
  onSelect: (id: string) => void
  onReview: (app: AppDoc) => void
}

export function AdminSubmissionRow({ app, selected, onSelect, onReview }: AdminSubmissionRowProps) {
  const { user } = useAuth()
  const [busy, setBusy] = useState<'approve' | 'reject' | 'feature' | null>(null)

  const statusKey = app.status as Exclude<AppStatus, 'deleted'>
  const categoryName = CATEGORIES.find((c) => c.slug === app.categorySlug)?.name ?? app.categorySlug

  async function quickApprove(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user || busy) return
    setBusy('approve')
    try { await moderateApp(app.id, 'approve', user.uid) } finally { setBusy(null) }
  }

  async function quickReject(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user || busy) return
    setBusy('reject')
    try { await moderateApp(app.id, 'reject', user.uid) } finally { setBusy(null) }
  }

  async function toggleFeature(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user || busy) return
    setBusy('feature')
    try { await featureApp(app.id, !app.isFeatured, user.uid) } finally { setBusy(null) }
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3',
        'transition-colors',
        selected && 'border-accent/40 bg-accent/5',
        busy && 'pointer-events-none opacity-60',
      )}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(app.id)}
        onClick={(e) => e.stopPropagation()}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-[var(--color-accent)]"
        aria-label={`Select ${app.name}`}
      />

      {/* Logo */}
      <AppLogo src={app.logoUrl} name={app.name} size="sm" className="shrink-0" />

      {/* Main info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-foreground">{app.name}</span>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold',
              STATUS_STYLES[statusKey] ?? STATUS_STYLES.pending,
            )}
          >
            {statusKey}
          </span>
          {app.isFeatured && (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <Star className="h-2.5 w-2.5" aria-hidden /> Featured
            </span>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0 text-xs text-muted-foreground">
          <span>{categoryName}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(app.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        {/* Review drawer */}
        <button
          type="button"
          onClick={() => onReview(app)}
          className={cn(
            'flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium',
            'text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          )}
          aria-label={`Review ${app.name}`}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:block">Review</span>
        </button>

        {/* Quick approve — only if not already approved */}
        {app.status !== 'approved' && (
          <button
            type="button"
            onClick={quickApprove}
            disabled={!!busy}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground',
              'transition-colors hover:bg-emerald-100 hover:text-emerald-700',
              'dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400',
              'disabled:pointer-events-none',
            )}
            aria-label={`Approve ${app.name}`}
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}

        {/* Quick reject — only if not already rejected */}
        {app.status !== 'rejected' && (
          <button
            type="button"
            onClick={quickReject}
            disabled={!!busy}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground',
              'transition-colors hover:bg-red-100 hover:text-red-700',
              'dark:hover:bg-red-900/30 dark:hover:text-red-400',
              'disabled:pointer-events-none',
            )}
            aria-label={`Reject ${app.name}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}

        {/* Feature toggle */}
        {app.status === 'approved' && (
          <button
            type="button"
            onClick={toggleFeature}
            disabled={!!busy}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              'disabled:pointer-events-none',
              app.isFeatured
                ? 'text-amber-500 hover:bg-muted'
                : 'text-muted-foreground hover:text-amber-500',
            )}
            aria-label={app.isFeatured ? `Unfeature ${app.name}` : `Feature ${app.name}`}
          >
            <Star
              className={cn('h-3.5 w-3.5', app.isFeatured && 'fill-current')}
              aria-hidden
            />
          </button>
        )}
      </div>
    </div>
  )
}
