import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { FeaturedWebAppCard } from '@/components/cards'
import type { WebAppCardData } from '@/types'

interface FeaturedAppsSectionProps {
  apps: WebAppCardData[]
}

export function FeaturedAppsSection({ apps }: FeaturedAppsSectionProps) {
  const [heroApp, ...gridApps] = apps.slice(0, 5)

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Featured Apps
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Exceptional web apps hand-picked by our editors
            </p>
          </div>
          <Link
            href="/apps?featured=true"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            See all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {heroApp && (
          <FeaturedWebAppCard app={heroApp} hero className="mb-6" />
        )}

        {gridApps.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {gridApps.map((app) => (
              <FeaturedWebAppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
