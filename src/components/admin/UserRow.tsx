'use client'

import { useState } from 'react'
import { ShieldCheck, ShieldOff } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { updateUserRole } from '@/lib/actions/updateUserRole'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'
import type { UserProfile } from '@/types'

function formatDate(ts: UserProfile['createdAt']): string {
  try {
    const d = ts && typeof (ts as { toDate?: () => Date }).toDate === 'function'
      ? (ts as { toDate: () => Date }).toDate()
      : new Date(ts as unknown as string)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return '—' }
}

interface UserRowProps {
  profile: UserProfile & { id: string }
}

export function UserRow({ profile }: UserRowProps) {
  const { user: currentUser } = useAuth()
  const [busy, setBusy] = useState(false)
  const isSelf = currentUser?.uid === profile.uid

  async function toggleRole() {
    if (!currentUser || busy || isSelf) return
    const newRole = profile.role === 'admin' ? 'user' : 'admin'
    setBusy(true)
    try { await updateUserRole(profile.uid, newRole, currentUser.uid) }
    finally { setBusy(false) }
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3',
        busy && 'pointer-events-none opacity-60',
      )}
    >
      <Avatar src={profile.photoURL} name={profile.displayName || profile.email} size="sm" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {profile.displayName || '(no name)'}
          </span>
          {profile.role === 'admin' && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
              <ShieldCheck className="h-2.5 w-2.5" aria-hidden /> Admin
            </span>
          )}
          {isSelf && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              You
            </span>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
          <span className="truncate">{profile.email}</span>
          <span aria-hidden>·</span>
          <span>Joined {formatDate(profile.createdAt)}</span>
        </div>
      </div>

      {!isSelf && (
        <button
          type="button"
          onClick={toggleRole}
          disabled={busy}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium',
            'transition-colors disabled:pointer-events-none disabled:opacity-50',
            profile.role === 'admin'
              ? 'text-muted-foreground hover:bg-muted hover:text-destructive'
              : 'text-muted-foreground hover:bg-muted hover:text-accent',
          )}
          aria-label={profile.role === 'admin' ? `Demote ${profile.displayName}` : `Promote ${profile.displayName} to admin`}
        >
          {profile.role === 'admin' ? (
            <><ShieldOff className="h-3.5 w-3.5" aria-hidden /> Demote</>
          ) : (
            <><ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Promote</>
          )}
        </button>
      )}
    </div>
  )
}
