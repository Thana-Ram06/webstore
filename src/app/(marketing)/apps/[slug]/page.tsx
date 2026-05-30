import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { AppHero } from '@/components/app-detail/AppHero'
import { ScreenshotGallery } from '@/components/app-detail/ScreenshotGallery'
import { AboutSection } from '@/components/app-detail/AboutSection'
import { InfoCard } from '@/components/app-detail/InfoCard'
import { RelatedApps } from '@/components/app-detail/RelatedApps'
import { ReviewsPreview } from '@/components/app-detail/ReviewsPreview'
import { StickyActionPanel } from '@/components/app-detail/StickyActionPanel'
import { getAppBySlug, getRelatedApps, getAppReviews } from '@/lib/data/getAppBySlug'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const app = await getAppBySlug(slug).catch(() => null)
  if (!app) return { title: 'App Not Found' }

  const description = app.description.slice(0, 160).replace(/\n/g, ' ')

  return {
    title: `${app.name} — WebsTore`,
    description,
    openGraph: {
      title: `${app.name} on WebsTore`,
      description: app.tagline,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.name} on WebsTore`,
      description: app.tagline,
    },
  }
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const app = await getAppBySlug(slug).catch(() => null)
  if (!app) notFound()

  const [relatedApps, reviews] = await Promise.all([
    getRelatedApps(app.categorySlug, app.id).catch(() => []),
    getAppReviews(app.id).catch(() => []),
  ])

  return (
    <>
      <AppHero app={app} />

      <Container className="py-8 pb-28 lg:pb-8">
        <div className="flex gap-8">
          {/* Main content */}
          <main className="min-w-0 flex-1 space-y-10">
            <ScreenshotGallery
              screenshots={app.screenshotUrls}
              appName={app.name}
              categorySlug={app.categorySlug}
            />
            <AboutSection app={app} />
            <ReviewsPreview
              reviews={reviews}
              appSlug={app.slug}
              totalCount={app.reviewCount}
              averageRating={app.averageRating}
            />
            <RelatedApps apps={relatedApps} categorySlug={app.categorySlug} />
          </main>

          {/* Desktop sticky sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-20 space-y-4">
              <StickyActionPanel app={app} variant="sidebar" />
              <InfoCard app={app} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden">
        <StickyActionPanel app={app} variant="mobile-bar" />
      </div>
    </>
  )
}
