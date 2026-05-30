'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Check, XCircle, Star, Globe } from 'lucide-react'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { moderateApp } from '@/lib/actions/moderateApp'
import { featureApp } from '@/lib/actions/featureApp'
import { CATEGORIES } from '@/lib/constants/categories'
import { APP_CONFIG } from '@/lib/constants/config'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'
import type { AppDoc, AppStatus } from '@/types'

const STATUS_STYLES: Record<Exclude<AppStatus, 'deleted'>, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

interface AppReviewDrawerProps {
  app: AppDoc | null
  onClose: () => void
  onModerated?: () => void
}

export function AppReviewDrawer({ app, onClose, onModerated }: AppReviewDrawerProps) {
  const { user } = useAuth()
  const [busy, setBusy] = useState<'approve' | 'reject' | 'feature' | null>(null)
  const [showRejectInput, setShowRejectInput] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const open = app !== null

  // Reset state when app changes
  useEffect(() => {
    setShowRejectInput(false)
    setRejectionReason('')
    setError(null)
    setBusy(null)
    setActiveScreenshot(0)
  }, [app?.id])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function handleApprove() {
    if (!user || !app || busy) return
    setBusy('approve')
    setError(null)
    try {
      await moderateApp(app.id, 'approve', user.uid)
      onModerated?.()
      onClose()
    } catch {
      setError('Action failed. Please try again.')
    } finally { setBusy(null) }
  }

  async function handleReject() {
    if (!user || !app || busy) return
    if (!showRejectInput) { setShowRejectInput(true); return }
    setBusy('reject')
    setError(null)
    try {
      await moderateApp(app.id, 'reject', user.uid, rejectionReason || undefined)
      onModerated?.()
      onClose()
    } catch {
      setError('Action failed. Please try again.')
    } finally { setBusy(null) }
  }

  async function handleFeatureToggle() {
    if (!user || !app || busy) return
    setBusy('feature')
    setError(null)
    try {
      await featureApp(app.id, !app.isFeatured, user.uid)
      onModerated?.()
    } catch {
      setError('Action failed. Please try again.')
    } finally { setBusy(null) }
  }

  const categoryName = app
    ? (CATEGORIES.find((c) => c.slug === app.categorySlug)?.name ?? app.categorySlug)
    : ''

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={app ? `Review: ${app.name}` : 'App review'}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-card shadow-2xl',
          'transition-transform duration-300 ease-in-out sm:w-[600px]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {app && (
          <>
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-border p-4">
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close review panel"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
              <AppLogo src={app.logoUrl} name={app.name} size="sm" className="shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{app.name}</p>
              </div>
              <span
                className={cn(
                  'inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold',
                  STATUS_STYLES[app.status as Exclude<AppStatus, 'deleted'>] ?? STATUS_STYLES.pending,
                )}
              >
                {app.status}
              </span>
            </div>

            {/* Action bar */}
            <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
              <button
                type="button"
                onClick={handleApprove}
                disabled={!!busy || app.status === 'approved'}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold',
                  'bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200',
                  'dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50',
                  'disabled:pointer-events-none disabled:opacity-40',
                )}
              >
                <Check className="h-3.5 w-3.5" aria-hidden />
                {busy === 'approve' ? 'Approving…' : 'Approve'}
              </button>

              <button
                type="button"
                onClick={handleReject}
                disabled={!!busy || app.status === 'rejected'}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold',
                  'bg-red-100 text-red-700 transition-colors hover:bg-red-200',
                  'dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50',
                  'disabled:pointer-events-none disabled:opacity-40',
                  showRejectInput && 'ring-2 ring-red-400',
                )}
              >
                <XCircle className="h-3.5 w-3.5" aria-hidden />
                {busy === 'reject' ? 'Rejecting…' : showRejectInput ? 'Confirm reject' : 'Reject'}
              </button>

              {app.status === 'approved' && (
                <button
                  type="button"
                  onClick={handleFeatureToggle}
                  disabled={!!busy}
                  className={cn(
                    'ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold',
                    'transition-colors disabled:pointer-events-none disabled:opacity-40',
                    app.isFeatured
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
                  )}
                >
                  <Star className={cn('h-3.5 w-3.5', app.isFeatured && 'fill-current')} aria-hidden />
                  {app.isFeatured ? 'Unfeature' : 'Feature'}
                </button>
              )}
            </div>

            {/* Rejection reason input */}
            {showRejectInput && (
              <div className="shrink-0 border-b border-border px-4 py-3">
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Rejection reason (optional — visible to submitter)"
                  className={cn(
                    'w-full rounded-lg border border-border bg-card px-3 py-2 text-sm',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  )}
                  maxLength={500}
                  autoFocus
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="shrink-0 border-b border-destructive/20 bg-destructive/5 px-4 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* App info */}
              <div className="border-b border-border p-4">
                <p className="text-base font-bold text-foreground">{app.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{app.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md bg-muted px-2 py-1 font-medium">{categoryName}</span>
                  <span className="rounded-md bg-muted px-2 py-1 font-medium">
                    {APP_CONFIG.pricingLabels[app.pricing as keyof typeof APP_CONFIG.pricingLabels] ?? app.pricing}
                  </span>
                  {app.platforms.map((p) => (
                    <span key={p} className="rounded-md bg-muted px-2 py-1 font-medium">
                      {APP_CONFIG.platformLabels[p as keyof typeof APP_CONFIG.platformLabels] ?? p}
                    </span>
                  ))}
                </div>
                <a
                  href={app.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden />
                  {app.websiteUrl}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </div>

              {/* Screenshots */}
              {app.screenshotUrls.length > 0 && (
                <div className="border-b border-border p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Screenshots ({app.screenshotUrls.length})
                  </p>
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={app.screenshotUrls[activeScreenshot]}
                      alt={`Screenshot ${activeScreenshot + 1}`}
                      fill
                      className="object-cover"
                      sizes="600px"
                      unoptimized
                    />
                  </div>
                  {app.screenshotUrls.length > 1 && (
                    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                      {app.screenshotUrls.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveScreenshot(i)}
                          className={cn(
                            'relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2',
                            'transition-colors',
                            i === activeScreenshot
                              ? 'border-accent'
                              : 'border-border hover:border-muted-foreground',
                          )}
                          aria-label={`Screenshot ${i + 1}`}
                        >
                          <Image src={url} alt="" fill className="object-cover" sizes="80px" unoptimized />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {app.description && (
                <div className="border-b border-border p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {app.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {app.features && app.features.length > 0 && (
                <div className="border-b border-border p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Key Features
                  </p>
                  <ul className="space-y-1.5">
                    {app.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {app.tags?.length > 0 && (
                <div className="p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
