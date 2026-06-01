import type { Metadata } from 'next'
import { PenLine } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Blog — AppVault',
  description: 'Tips, guides, and curated lists from the AppVault team.',
}

export default function BlogPage() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
            <PenLine className="h-8 w-8 text-accent" aria-hidden />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Articles, curated lists, and deep-dives on the best web apps and tools — coming soon.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Subscribe to the{' '}
          <a href="/newsletter" className="text-accent hover:underline">
            newsletter
          </a>{' '}
          to be notified when we publish.
        </p>
      </div>
    </Container>
  )
}
