import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedAppsSection } from '@/components/home/FeaturedAppsSection'
import { TrendingSection } from '@/components/home/TrendingSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection'
import { OpenSourceSection } from '@/components/home/OpenSourceSection'
import { CtaSection } from '@/components/home/CtaSection'
import {
  getFeaturedApps,
  getTrendingApps,
  getNewArrivals,
  getOpenSourceApps,
  getCategoryCounts,
} from '@/lib/data/getHomeData'

export const metadata: Metadata = {
  title: 'AppVault — Discover the Best Web Apps',
  description:
    'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
  openGraph: {
    title: 'AppVault — Discover the Best Web Apps',
    description:
      'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppVault — Discover the Best Web Apps',
    description:
      'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
  },
}

export default async function HomePage() {
  const [featured, trending, arrivals, openSource, categoryCounts] =
    await Promise.all([
      getFeaturedApps(5).catch(() => []),
      getTrendingApps(8).catch(() => []),
      getNewArrivals(6).catch(() => []),
      getOpenSourceApps(6).catch(() => []),
      getCategoryCounts().catch(() => ({})),
    ])

  return (
    <>
      <HeroSection />
      <FeaturedAppsSection apps={featured} />
      <TrendingSection apps={trending} />
      <CategoriesSection counts={categoryCounts} />
      <NewArrivalsSection apps={arrivals} />
      <OpenSourceSection apps={openSource} />
      <CtaSection />
    </>
  )
}
