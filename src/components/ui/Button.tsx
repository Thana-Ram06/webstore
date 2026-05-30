import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Variant definitions
   ───────────────────────────────────────── */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-full font-medium leading-none transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground hover:bg-accent-hover',
        secondary:
          'border border-border bg-card text-foreground hover:bg-muted hover:border-muted-foreground/25',
        ghost:
          'text-foreground hover:bg-muted',
        danger:
          'bg-destructive text-destructive-foreground hover:bg-destructive/85',
        outline:
          'border border-accent text-accent hover:bg-accent-subtle',
        link:
          'text-accent underline-offset-4 hover:underline h-auto p-0',
        muted:
          'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground',
      },
      size: {
        sm:       'h-8 px-3 text-xs',
        md:       'h-9 px-4 text-sm',
        lg:       'h-10 px-5 text-sm',
        xl:       'h-11 px-6 text-base',
        icon:     'h-9 w-9 p-0',
        'icon-sm':'h-8 w-8 p-0',
        'icon-lg':'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  loading?: boolean
  href?: string
  /** Pass target/_blank when using href */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: string
}

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      href,
      target,
      rel,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    const inner = (
      <>
        {loading && (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        )}
        {children}
      </>
    )

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={classes}
          aria-disabled={disabled}
        >
          {inner}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {inner}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
