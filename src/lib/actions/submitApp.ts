'use client'

import { setDoc, doc } from 'firebase/firestore'
import { db, Collections, serverTimestamp } from '@/lib/firebase/firestore'
import type { SubmitDraft } from '@/types/submit'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export async function submitApp(draft: SubmitDraft, userId: string): Promise<string> {
  const docRef = doc(db, Collections.APPS, draft.draftId)

  await setDoc(docRef, {
    id: draft.draftId,
    slug: generateSlug(draft.name),
    name: draft.name.trim(),
    tagline: draft.tagline.trim(),
    description: draft.description.trim(),
    websiteUrl: draft.websiteUrl.trim(),
    logoUrl: draft.logoUrl,
    screenshotUrls: draft.screenshotUrls,
    categorySlug: draft.categorySlug,
    pricing: draft.pricing,
    pricingNote: draft.pricingNote?.trim() || null,
    platforms: draft.platforms,
    tags: draft.tags.filter(Boolean),
    features: draft.features.filter(Boolean),
    status: 'pending',
    submittedBy: userId,
    averageRating: 0,
    reviewCount: 0,
    favoriteCount: 0,
    viewCount: 0,
    score: 0,
    isFeatured: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return draft.draftId
}
