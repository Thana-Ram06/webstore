import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  hint?: string
  /** Show character count (requires maxLength) */
  showCount?: boolean
  currentLength?: number
  fullWidth?: boolean
}

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      label,
      hint,
      showCount = false,
      currentLength = 0,
      maxLength,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const hasError = Boolean(error)
    const nearLimit = maxLength !== undefined && currentLength >= maxLength * 0.85

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          className={cn(
            'flex min-h-[120px] w-full resize-y rounded-lg border bg-card px-3.5 py-3',
            'text-sm text-foreground placeholder:text-muted-foreground',
            'transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            hasError
              ? 'border-destructive focus-visible:ring-destructive/30'
              : 'border-border focus-visible:border-ring',
            className,
          )}
          {...props}
        />

        <div className="flex items-start justify-between gap-2">
          <div>
            {hasError && (
              <p
                id={`${textareaId}-error`}
                className="text-xs text-destructive"
                role="alert"
              >
                {error}
              </p>
            )}
            {hint && !hasError && (
              <p id={`${textareaId}-hint`} className="text-xs text-muted-foreground">
                {hint}
              </p>
            )}
          </div>

          {showCount && maxLength !== undefined && (
            <p
              className={cn(
                'ml-auto shrink-0 text-xs tabular-nums',
                nearLimit ? 'text-warning' : 'text-muted-foreground',
              )}
              aria-live="polite"
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
export type { TextareaProps }
