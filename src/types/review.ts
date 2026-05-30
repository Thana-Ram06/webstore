import type { TimestampedDoc } from './common'

export interface ReviewDoc extends TimestampedDoc {
  id: string
  appId: string
  userId: string
  userDisplayName: string
  userPhotoURL?: string | null
  rating: number
  title: string
  body: string
  helpfulCount: number
  isVerified: boolean
}

export interface ReviewVoteDoc {
  userId: string
  reviewId: string
  appId: string
  createdAt: TimestampedDoc['createdAt']
}
