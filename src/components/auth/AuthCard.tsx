import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function AuthCard({ title, subtitle, children, footer, className }: AuthCardProps) {
  return (
    <div className={cn('w-full max-w-sm', className)}>
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link
          href="/"
          aria-label="WebsTore — Home"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-opacity hover:opacity-90"
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
            <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
          </svg>
        </Link>
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground" style={{ fontFamily: 'var(--font-instrument-serif), serif' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
