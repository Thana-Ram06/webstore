import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon or element rendered inside the input on the left */
  leftSlot?: React.ReactNode
  /** Icon or element rendered inside the input on the right */
  rightSlot?: React.ReactNode
  /** Validation error message — renders below the input */
  error?: string
  /** Label above the input */
  label?: string
  /** Helper text below the input (hidden when error is shown) */
  hint?: string
  /** Stretch to fill parent width (default: true) */
  fullWidth?: boolean
}

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftSlot,
      rightSlot,
      error,
      label,
      hint,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Left slot */}
          {leftSlot && (
            <span className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
              {leftSlot}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={cn(
              'flex h-10 w-full rounded-lg border bg-card px-3.5 py-2',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Border color
              hasError
                ? 'border-destructive focus-visible:ring-destructive/30'
                : 'border-border focus-visible:border-ring',
              // Slot padding adjustments
              leftSlot && 'pl-9',
              rightSlot && 'pr-9',
              className,
            )}
            {...props}
          />

          {/* Right slot */}
          {rightSlot && (
            <span className="absolute right-3 flex items-center text-muted-foreground">
              {rightSlot}
            </span>
          )}
        </div>

        {/* Error */}
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Hint — hidden when error shown */}
        {hint && !hasError && (
          <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
