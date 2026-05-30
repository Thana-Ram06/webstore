import type { Timestamp } from './common'

export interface FavoriteDoc {
  userId: string
  appId: string
  appName: string
  appLogoUrl: string
  appSlug: string
  savedAt: Timestamp
}
