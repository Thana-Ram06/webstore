import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export const STEPS = [
  { id: 1 as const, label: 'Basics' },
  { id: 2 as const, label: 'Details' },
  { id: 3 as const, label: 'Media' },
  { id: 4 as const, label: 'Review' },
]

interface StepIndicatorProps {
  current: 1 | 2 | 3 | 4
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <nav aria-label="Submission progress" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((step, index) => {
          const done = step.id < current
          const active = step.id === current

          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              {/* Circle + label */}
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                    done && 'bg-accent text-white',
                    active && 'bg-accent text-white ring-4 ring-accent/20',
                    !done && !active && 'border-2 border-border text-muted-foreground',
                  )}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : step.id}
                </span>
                <span
                  className={cn(
                    'hidden text-[11px] font-medium sm:block',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line (skip after last step) */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 rounded-full transition-colors',
                    step.id < current ? 'bg-accent' : 'bg-border',
                  )}
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
