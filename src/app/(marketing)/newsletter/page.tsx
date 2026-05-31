import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Newsletter — WebsTore',
  description: 'Subscribe to the WebsTore newsletter for curated app picks and platform updates.',
}

export default function NewsletterPage() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
            <Mail className="h-8 w-8 text-accent" aria-hidden />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Newsletter</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Get weekly picks of the best new web apps, curated lists, and platform updates — straight to your inbox.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="you@example.com"
            aria-label="Email address"
            className="h-11 flex-1 rounded-xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-ring/25"
          />
          <button
            type="button"
            disabled
            className="h-11 rounded-xl bg-accent px-5 text-sm font-medium text-accent-foreground opacity-60"
          >
            Subscribe
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Newsletter launching soon — enter your email to be first on the list.
        </p>
      </div>
    </Container>
  )
}
