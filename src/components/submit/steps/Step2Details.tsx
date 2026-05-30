'use client'

import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { appSubmitSchema } from '@/lib/utils/validators'
import { CATEGORIES } from '@/lib/constants/categories'
import { APP_CONFIG } from '@/lib/constants/config'
import { cn } from '@/lib/utils/cn'
import type { SubmitDraft } from '@/types/submit'

const step2Schema = appSubmitSchema.pick({
  description: true,
  categorySlug: true,
  pricing: true,
  platforms: true,
  tags: true,
})

type Step2Errors = Partial<Record<'description' | 'features' | 'categorySlug' | 'pricing' | 'platforms' | 'tags', string>>

interface Step2Props {
  draft: SubmitDraft
  onChange: (partial: Partial<SubmitDraft>) => void
  onNext: () => void
  onBack: () => void
}

export function Step2Details({ draft, onChange, onNext, onBack }: Step2Props) {
  const [errors, setErrors] = useState<Step2Errors>({})
  const [featureInput, setFeatureInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  function clearFieldError(field: keyof Step2Errors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function addFeature() {
    const trimmed = featureInput.trim()
    if (!trimmed) return
    onChange({ features: [...draft.features, trimmed] })
    setFeatureInput('')
    clearFieldError('features')
  }

  function removeFeature(index: number) {
    onChange({ features: draft.features.filter((_, i) => i !== index) })
  }

  function handleFeatureKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeature()
    }
  }

  function addTag() {
    const trimmed = tagInput.trim().toLowerCase().replace(/,/g, '')
    if (!trimmed || draft.tags.length >= 8 || draft.tags.includes(trimmed)) return
    onChange({ tags: [...draft.tags, trimmed] })
    setTagInput('')
    clearFieldError('tags')
  }

  function removeTag(tag: string) {
    onChange({ tags: draft.tags.filter((t) => t !== tag) })
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  function togglePlatform(p: string) {
    const next = draft.platforms.includes(p)
      ? draft.platforms.filter((x) => x !== p)
      : [...draft.platforms, p]
    onChange({ platforms: next })
    clearFieldError('platforms')
  }

  function handleNext() {
    const result = step2Schema.safeParse({
      description: draft.description,
      categorySlug: draft.categorySlug,
      pricing: draft.pricing,
      platforms: draft.platforms,
      tags: draft.tags,
    })

    const fieldErrors: Step2Errors = {}

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof Step2Errors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
    }

    if (draft.features.length === 0) {
      fieldErrors.features = 'Add at least one key feature.'
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onNext()
  }

  const inputBase = cn(
    'flex-1 rounded-lg border border-border bg-card px-3.5 py-2 text-sm',
    'text-foreground placeholder:text-muted-foreground transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  )

  return (
    <div className="space-y-6">
      {/* Description */}
      <Textarea
        label="Description"
        value={draft.description}
        onChange={(e) => { onChange({ description: e.target.value }); clearFieldError('description') }}
        error={errors.description}
        placeholder="Describe your app in detail. What problem does it solve? Who is it for? What makes it stand out?"
        maxLength={2000}
        showCount
        currentLength={draft.description.length}
        rows={5}
        hint="Minimum 50 characters. Plain text only."
      />

      {/* Key Features */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Key Features</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={handleFeatureKeyDown}
            placeholder="e.g. Real-time collaboration"
            className={inputBase}
          />
          <Button type="button" variant="secondary" size="md" onClick={addFeature}>
            <Plus className="h-4 w-4" aria-hidden />
            Add
          </Button>
        </div>
        {errors.features && (
          <p className="text-xs text-destructive" role="alert">{errors.features}</p>
        )}
        {draft.features.length > 0 && (
          <ul className="space-y-1.5 pt-1">
            {draft.features.map((feat, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
              >
                <span className="text-foreground">{feat}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Remove feature: ${feat}`}
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted-foreground">Press Enter to add. At least 1 required.</p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => { onChange({ categorySlug: cat.slug }); clearFieldError('categorySlug') }}
              className={cn(
                'rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                draft.categorySlug === cat.slug
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-card text-foreground hover:bg-muted',
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {errors.categorySlug && (
          <p className="text-xs text-destructive" role="alert">{errors.categorySlug}</p>
        )}
      </div>

      {/* Pricing Model */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Pricing Model</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {APP_CONFIG.pricingModels.map((model) => (
            <button
              key={model}
              type="button"
              onClick={() => { onChange({ pricing: model }); clearFieldError('pricing') }}
              className={cn(
                'rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                draft.pricing === model
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-card text-foreground hover:bg-muted',
              )}
            >
              {APP_CONFIG.pricingLabels[model]}
            </button>
          ))}
        </div>
        {errors.pricing && (
          <p className="text-xs text-destructive" role="alert">{errors.pricing}</p>
        )}
      </div>

      {/* Platforms */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Platforms</label>
        <div className="flex flex-wrap gap-2">
          {APP_CONFIG.platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePlatform(p)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                draft.platforms.includes(p)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-card text-foreground hover:bg-muted',
              )}
            >
              {APP_CONFIG.platformLabels[p]}
            </button>
          ))}
        </div>
        {errors.platforms && (
          <p className="text-xs text-destructive" role="alert">{errors.platforms}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Tags{' '}
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="e.g. kanban, real-time, open-source"
            disabled={draft.tags.length >= 8}
            className={inputBase}
          />
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={addTag}
            disabled={draft.tags.length >= 8}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add
          </Button>
        </div>
        {draft.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {draft.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Remove tag: ${tag}`}
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.tags && (
          <p className="text-xs text-destructive" role="alert">{errors.tags}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Press Enter or comma to add · {draft.tags.length}/8
        </p>
      </div>

      {/* Pricing Note */}
      <Input
        label="Pricing Note"
        value={draft.pricingNote}
        onChange={(e) => onChange({ pricingNote: e.target.value })}
        placeholder="e.g. Free up to 3 users, then $10/month"
        maxLength={100}
        hint="Optional. Add details about tiers, trial periods, or limitations."
      />

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button onClick={onBack} variant="secondary" size="lg">
          ← Back
        </Button>
        <Button onClick={handleNext} size="lg">
          Continue →
        </Button>
      </div>
    </div>
  )
}
