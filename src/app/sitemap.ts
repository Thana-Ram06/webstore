import type { MetadataRoute } from 'next'
import { getAdminDb } from '@/lib/firebase/admin'

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFreq: 'daily' as const },
  { path: '/apps', priority: 0.9, changeFreq: 'hourly' as const },
  { path: '/submit', priority: 0.6, changeFreq: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://appvault.com'
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }))

  let appEntries: MetadataRoute.Sitemap = []
  try {
    const db = getAdminDb()
    const snap = await db
      .collection('apps')
      .where('status', '==', 'approved')
      .select('slug', 'updatedAt')
      .get()

    appEntries = snap.docs.map((doc) => {
      const data = doc.data()
      const updatedAt = data.updatedAt?.toDate?.() ?? now
      return {
        url: `${baseUrl}/apps/${data.slug as string}`,
        lastModified: updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch {
    // Return static entries only if Firestore is unavailable
  }

  return [...staticEntries, ...appEntries]
}
