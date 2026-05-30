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
  title: 'WebsTore — The Home of Modern Web Apps',
  description:
    'Discover, review, and save the best web apps — AI tools, developer utilities, design software, and no-code platforms. Curated by developers and makers.',
  openGraph: {
    title: 'WebsTore — The Home of Modern Web Apps',
    description:
      'Discover, review, and save the best web apps — curated by developers and makers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebsTore — The Home of Modern Web Apps',
    description:
      'Discover, review, and save the best web apps — curated by developers and makers.',
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
