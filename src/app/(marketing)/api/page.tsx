import type { Metadata } from 'next'
import { Code2 } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Developer API — AppVault',
  description: 'AppVault developer API — access app data, categories, and search programmatically.',
}

export default function ApiPage() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
            <Code2 className="h-8 w-8 text-accent" aria-hidden />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Developer API</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Programmatic access to AppVault app data, categories, ratings, and search — coming soon.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Interested in early access?{' '}
          <a href="mailto:hello@appvault.com" className="text-accent hover:underline">
            Get in touch.
          </a>
        </p>
      </div>
    </Container>
  )
}
