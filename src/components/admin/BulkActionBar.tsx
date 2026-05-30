'use client'

import { useState } from 'react'
import { CheckCheck, XCircle, X } from 'lucide-react'
import { moderateApp } from '@/lib/actions/moderateApp'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

interface BulkActionBarProps {
  selectedIds: string[]
  onClear: () => void
}

export function BulkActionBar({ selectedIds, onClear }: BulkActionBarProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)

  if (selectedIds.length === 0) return null

  async function handleBulkApprove() {
    if (!user || loading) return
    setLoading('approve')
    try {
      await Promise.all(selectedIds.map((id) => moderateApp(id, 'approve', user!.uid)))
      onClear()
    } finally {
      setLoading(null)
    }
  }

  async function handleBulkReject() {
    if (!user || loading) return
    if (!showRejectInput) { setShowRejectInput(true); return }
    setLoading('reject')
    try {
      await Promise.all(
        selectedIds.map((id) => moderateApp(id, 'reject', user!.uid, rejectionReason || undefined)),
      )
      setRejectionReason('')
      setShowRejectInput(false)
      onClear()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="sticky top-14 z-20 -mx-4 sm:-mx-6">
      <div className="border-b border-accent/20 bg-accent/10 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-accent">
            {selectedIds.length} {selectedIds.length === 1 ? 'app' : 'apps'} selected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBulkApprove}
              disabled={!!loading}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold',
                'bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200',
                'dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              <CheckCheck className="h-3.5 w-3.5" aria-hidden />
              {loading === 'approve' ? 'Approving…' : 'Approve all'}
            </button>

            <button
              type="button"
              onClick={handleBulkReject}
              disabled={!!loading}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold',
                'bg-red-100 text-red-700 transition-colors hover:bg-red-200',
                'dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              <XCircle className="h-3.5 w-3.5" aria-hidden />
              {loading === 'reject' ? 'Rejecting…' : showRejectInput ? 'Confirm reject' : 'Reject all'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => { onClear(); setShowRejectInput(false) }}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Clear selection"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>

        {showRejectInput && (
          <div className="mt-2">
            <input
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Rejection reason (optional)"
              className={cn(
                'w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm',
                'text-foreground placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
              maxLength={500}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}
