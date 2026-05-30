import Link from 'next/link'
import { ArrowRight, GitFork } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { WebAppCard } from '@/components/cards'
import type { WebAppCardData } from '@/types'

interface OpenSourceSectionProps {
  apps: WebAppCardData[]
}

export function OpenSourceSection({ apps }: OpenSourceSectionProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <GitFork className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Open Source
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Open Source Picks
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Free tools you can self-host, fork, and contribute to
            </p>
          </div>
          <Link
            href="/apps?category=open-source"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View collection
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.slice(0, 6).map((app) => (
            <WebAppCard key={app.id} app={app} />
          ))}
        </div>
      </Container>
    </section>
  )
}
