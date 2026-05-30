export type { CategorySlug } from './common'

export interface CategoryMeta {
  slug: string
  name: string
  description: string
  iconName: string
  accentColor: string
  displayOrder: number
  appCount?: number
}
