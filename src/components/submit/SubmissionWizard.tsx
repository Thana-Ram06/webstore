'use client'

import { useState, useEffect, useRef } from 'react'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { submitApp } from '@/lib/actions/submitApp'
import { StepIndicator } from './StepIndicator'
import { Step1Basics } from './steps/Step1Basics'
import { Step2Details } from './steps/Step2Details'
import { Step3Media } from './steps/Step3Media'
import { Step4Review } from './steps/Step4Review'
import { Step5Success } from './steps/Step5Success'
import { Button } from '@/components/ui/Button'
import type { SubmitDraft, StepId } from '@/types/submit'

const DRAFT_KEY = 'webstore_submit_draft'

const INITIAL_DRAFT: SubmitDraft = {
  currentStep: 1,
  name: '',
  websiteUrl: '',
  tagline: '',
  description: '',
  features: [],
  categorySlug: '',
  pricing: '',
  pricingNote: '',
  platforms: [],
  tags: [],
  logoUrl: '',
  screenshotUrls: [],
  draftId: '',
}

function loadDraft(): SubmitDraft {
  if (typeof window === 'undefined') return { ...INITIAL_DRAFT, draftId: '' }
  try {
    const saved = localStorage.getItem(DRAFT_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as SubmitDraft
      if (!parsed.draftId) parsed.draftId = crypto.randomUUID()
      return parsed
    }
  } catch {
    // storage unavailable
  }
  return { ...INITIAL_DRAFT, draftId: crypto.randomUUID() }
}

export function SubmissionWizard() {
  const { user, loading } = useAuth()
  const [draft, setDraft] = useState<SubmitDraft>(() => loadDraft())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Ensure draftId exists client-side (handles SSR mismatch)
  useEffect(() => {
    if (!draft.draftId) {
      setDraft((prev) => ({ ...prev, draftId: crypto.randomUUID() }))
    }
  }, [draft.draftId])

  // Autosave with 800ms debounce
  useEffect(() => {
    if (submitted) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      } catch {
        // quota exceeded — ignore
      }
    }, 800)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [draft, submitted])

  function updateDraft(partial: Partial<SubmitDraft>) {
    setDraft((prev) => ({ ...prev, ...partial }))
  }

  function handleNext() {
    if (draft.currentStep < 4) {
      updateDraft({ currentStep: (draft.currentStep + 1) as StepId })
    }
  }

  function handleBack() {
    if (draft.currentStep > 1) {
      updateDraft({ currentStep: (draft.currentStep - 1) as StepId })
    }
  }

  async function handleSubmit() {
    if (!user) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await submitApp(draft, user.uid)
      try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Submission failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auth loading
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    )
  }

  // Not signed in
  if (!user) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <LogIn className="h-7 w-7 text-muted-foreground" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Sign in to submit</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
          You need an account to submit a web app to WebsTore.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/login" size="lg">
            Sign in
          </Button>
          <Button href="/signup" variant="secondary" size="lg">
            Create account
          </Button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return <Step5Success />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator current={draft.currentStep} />

      <div className="mt-8">
        {draft.currentStep === 1 && (
          <Step1Basics draft={draft} onChange={updateDraft} onNext={handleNext} />
        )}
        {draft.currentStep === 2 && (
          <Step2Details
            draft={draft}
            onChange={updateDraft}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {draft.currentStep === 3 && (
          <Step3Media
            draft={draft}
            onChange={updateDraft}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {draft.currentStep === 4 && (
          <Step4Review
            draft={draft}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}
      </div>

      {/* Draft autosave indicator */}
      <p className="mt-6 text-center text-xs text-muted-foreground/60">
        Draft saved automatically
      </p>
    </div>
  )
}
