import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Variant definitions
   ───────────────────────────────────────── */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium leading-none transition-colors',
  {
    variants: {
      variant: {
        /** Neutral muted — for tags, platforms, tech stack */
        default: 'bg-muted text-muted-foreground',
        /** Accent-tinted — for featured labels, "new", highlights */
        accent: 'bg-accent-subtle text-accent',
        /** Solid accent — for primary status callouts */
        solid: 'bg-accent text-accent-foreground',
        /** Outlined — for category pills with no fill */
        outline: 'border border-border text-foreground bg-transparent',
        /** Outlined accent — for active category filters */
        'outline-accent': 'border border-accent text-accent bg-transparent',
        /** Status variants */
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        danger: 'bg-destructive/10 text-destructive',
        /** Approval pipeline */
        pending: 'bg-warning/10 text-warning',
        approved: 'bg-success/10 text-success',
        rejected: 'bg-destructive/10 text-destructive',
        /** Pricing */
        free: 'bg-success/10 text-success',
        freemium: 'bg-accent-subtle text-accent',
        paid: 'bg-muted text-muted-foreground',
        'open-source': 'bg-muted text-muted-foreground',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[10px]',
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
type BadgeVariants = VariantProps<typeof badgeVariants>

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  /** Show a small colored dot before the label */
  dot?: boolean
}

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
function Badge({ variant, size, dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70"
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
