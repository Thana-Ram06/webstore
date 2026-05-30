export type StepId = 1 | 2 | 3 | 4

export interface SubmitDraft {
  currentStep: StepId
  // Step 1
  name: string
  websiteUrl: string
  tagline: string
  // Step 2
  description: string
  features: string[]
  categorySlug: string
  pricing: string
  pricingNote: string
  platforms: string[]
  tags: string[]
  // Step 3 — URLs populated after Firebase Storage upload
  logoUrl: string
  screenshotUrls: string[]
  // UUID used for both Storage paths and Firestore doc ID
  draftId: string
}
