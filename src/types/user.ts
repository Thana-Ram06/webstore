import type { TimestampedDoc, UserRole } from './common'

export interface UserProfile extends TimestampedDoc {
  uid: string
  email: string
  displayName: string
  photoURL?: string | null
  role: UserRole
  bio?: string
  websiteUrl?: string
  submittedApps: string[]
  favoriteCount: number
}

export interface PublicUserProfile {
  uid: string
  displayName: string
  photoURL?: string | null
  bio?: string
  submittedApps: string[]
}

export interface SessionUser {
  uid: string
  email: string
  displayName: string
  photoURL?: string | null
  role: UserRole
}
