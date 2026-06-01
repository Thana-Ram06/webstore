import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-30 blur-3xl"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse, hsl(var(--accent) / 0.25), transparent 70%)' }}
      />

      {/* Top bar */}
      <header className="flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to AppVault
        </Link>
        <ThemeToggle />
      </header>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="flex h-12 items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
        <span aria-hidden>·</span>
        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        <span aria-hidden>·</span>
        <span>© {new Date().getFullYear()} AppVault</span>
      </footer>
    </div>
  )
}
