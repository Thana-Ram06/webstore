import * as z from 'zod'
import { APP_CONFIG } from '@/lib/constants/config'

const { platforms, pricingModels } = APP_CONFIG

export const appSubmitSchema = z.object({
  name: z.string().min(2, { error: 'App name must be at least 2 characters.' }).max(80, { error: 'App name must be 80 characters or less.' }).trim(),
  tagline: z.string().min(10, { error: 'Tagline must be at least 10 characters.' }).max(120, { error: 'Tagline must be 120 characters or less.' }).trim(),
  description: z.string().min(50, { error: 'Description must be at least 50 characters.' }).max(2000, { error: 'Description must be 2000 characters or less.' }).trim(),
  websiteUrl: z.url({ error: 'Please enter a valid URL.' }),
  categorySlug: z.string().min(1, { error: 'Please select a category.' }),
  platforms: z.array(z.enum([...(platforms as unknown as [string, ...string[]])])).min(1, { error: 'Select at least one platform.' }),
  pricing: z.enum([...(pricingModels as unknown as [string, ...string[]])]),
  pricingNote: z.string().max(100).optional(),
  tags: z.array(z.string().trim().min(1)).max(8, { error: 'Maximum 8 tags allowed.' }).default([]),
})

export type AppSubmitInput = z.infer<typeof appSubmitSchema>

export const reviewSchema = z.object({
  rating: z.number().int().min(1, { error: 'Rating must be at least 1.' }).max(5, { error: 'Rating must be at most 5.' }),
  title: z.string().min(3, { error: 'Title must be at least 3 characters.' }).max(100, { error: 'Title must be 100 characters or less.' }).trim(),
  body: z.string().min(20, { error: 'Review must be at least 20 characters.' }).max(2000, { error: 'Review must be 2000 characters or less.' }).trim(),
})

export type ReviewInput = z.infer<typeof reviewSchema>

export const profileUpdateSchema = z.object({
  displayName: z.string().min(2, { error: 'Name must be at least 2 characters.' }).max(50, { error: 'Name must be 50 characters or less.' }).trim(),
  bio: z.string().max(300, { error: 'Bio must be 300 characters or less.' }).optional(),
  websiteUrl: z.url({ error: 'Please enter a valid URL.' }).optional().or(z.literal('')),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>

export const appReviewActionSchema = z.object({
  appId: z.string().min(1),
  action: z.enum(['approve', 'reject']),
  rejectionReason: z.string().max(500).optional(),
})

export type AppReviewActionInput = z.infer<typeof appReviewActionSchema>
