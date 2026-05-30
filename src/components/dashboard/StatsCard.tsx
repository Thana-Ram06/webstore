import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  description?: string
  accent?: boolean
  className?: string
}

export function StatsCard({ icon: Icon, label, value, description, accent, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5',
        accent && 'border-accent/30 bg-accent/5',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            accent ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground',
          )}
        >
          <Icon className="h-4.5 w-4.5" aria-hidden />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground/70">{description}</p>
        )}
      </div>
    </div>
  )
}
