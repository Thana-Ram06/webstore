import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface EmptyDashboardStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyDashboardState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyDashboardStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action && (
        <div className="mt-6">
          <Button href={action.href} size="lg">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}
