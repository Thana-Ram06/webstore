import { CATEGORIES } from '@/lib/constants/categories'

const MOCK_APP_COUNTS: Record<string, number> = {
  'ai-tools': 89,
  'productivity': 134,
  'developer-tools': 112,
  'design-tools': 78,
  'marketing': 56,
  'finance': 43,
  'analytics': 67,
  'collaboration': 91,
  'no-code': 38,
  'education': 29,
  'open-source': 145,
  'security': 31,
}

export const mockCategories = CATEGORIES.map((c) => ({
  ...c,
  appCount: MOCK_APP_COUNTS[c.slug] ?? 0,
}))
