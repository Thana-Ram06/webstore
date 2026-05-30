import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { WebAppCard } from '@/components/cards'
import type { WebAppCardData } from '@/types'

interface NewArrivalsSectionProps {
  apps: WebAppCardData[]
}

export function NewArrivalsSection({ apps }: NewArrivalsSectionProps) {
  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2">
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
                New This Month
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Fresh Arrivals
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The newest additions to our directory — just landed
            </p>
          </div>
          <Link
            href="/apps?sort=newest"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            See all
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
