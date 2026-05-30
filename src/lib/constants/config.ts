export const APP_CONFIG = {
  name: 'WebsTore',
  tagline: 'The Home of Modern Web Apps',
  description:
    'Discover, review, and save the best web apps — curated by developers and makers.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://webstorehq.com',

  /** Submission constraints */
  maxScreenshots: 8,
  maxTagsPerApp: 8,
  maxTaglineLength: 80,
  maxDescriptionLength: 2000,
  maxReviewBodyLength: 1000,
  maxReviewTitleLength: 80,

  /** Pricing options shown in submit form and filters */
  pricingModels: ['free', 'freemium', 'paid', 'open-source'] as const,
  pricingLabels: {
    free: 'Free',
    freemium: 'Freemium',
    paid: 'Paid',
    'open-source': 'Open Source',
  } as const,

  /**
   * Platform options for web apps only.
   * Intentionally excludes iOS/Android — WebsTore lists web apps, not native mobile apps.
   */
  platforms: ['web', 'pwa', 'desktop', 'extension'] as const,
  platformLabels: {
    web: 'Web',
    pwa: 'PWA',
    desktop: 'Desktop App',
    extension: 'Browser Extension',
  } as const,

  /** App detail CTA — "open in browser" language, not "download/install" */
  visitCta: 'Open Web App',
  visitCtaShort: 'Visit',
} as const

export type PricingModel = (typeof APP_CONFIG.pricingModels)[number]
export type Platform = (typeof APP_CONFIG.platforms)[number]
