import type { Metadata } from 'next'
import { getApps } from '@/lib/data/getApps'
import { parseFilters } from '@/lib/data/browseUtils'
import { getBrowseFacets } from '@/lib/data/getHomeData'
import { BrowseLayout } from '@/components/browse/BrowseLayout'

export const metadata: Metadata = {
  title: 'Browse Web Apps',
  description:
    'Discover the best web apps across AI, productivity, developer tools, design, marketing, and more. Filter by pricing, platform, and category.',
  openGraph: {
    title: 'Browse Web Apps — AppVault',
    description:
      'Discover the best web apps across AI, productivity, developer tools, design, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Web Apps — AppVault',
    description: 'Discover the best web apps — filter by category, pricing, and platform.',
  },
}

export default async function AppsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const filters = parseFilters(params)

  const [result, facets] = await Promise.all([
    getApps(filters).catch(() => ({ apps: [], totalCount: 0, hasMore: false })),
    getBrowseFacets().catch(() => ({ categoryCounts: {}, pricingCounts: {} })),
  ])

  return (
    <BrowseLayout
      apps={result.apps}
      totalCount={result.totalCount}
      filters={filters}
      categoryCounts={facets.categoryCounts}
      pricingCounts={facets.pricingCounts}
    />
  )
}
