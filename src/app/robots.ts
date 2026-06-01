import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://appvault.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/', '/submit', '/login', '/signup', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
