import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { WebAppCard } from '@/components/cards'
import type { WebAppCardData } from '@/types'

interface TrendingSectionProps {
  apps: WebAppCardData[]
}

export function TrendingSection({ apps }: TrendingSectionProps) {
  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-accent" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                This Week
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Trending Web Apps
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              What developers and makers are discovering right now
            </p>
          </div>
          <Link
            href="/apps?sort=trending"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            See all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.slice(0, 8).map((app) => (
            <WebAppCard key={app.id} app={app} />
          ))}
        </div>
      </Container>
    </section>
  )
}
