'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { SubmissionPreview } from '@/components/submit/SubmissionPreview'
import { Button } from '@/components/ui/Button'
import type { SubmitDraft } from '@/types/submit'

interface Step4Props {
  draft: SubmitDraft
  onBack: () => void
  onSubmit: () => Promise<void>
  isSubmitting: boolean
  submitError: string | null
}

export function Step4Review({ draft, onBack, onSubmit, isSubmitting, submitError }: Step4Props) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground">Review Your Submission</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Double-check everything before submitting for review.
        </p>
      </div>

      <SubmissionPreview draft={draft} />

      {/* Terms */}
      <label className="flex cursor-pointer items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-border accent-[var(--color-accent)]"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          I confirm this app is real, publicly accessible, and meets the{' '}
          <a
            href="/guidelines"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            WebsTore submission guidelines
          </a>
          . I have the right to submit this app.
        </span>
      </label>

      {/* Submit error */}
      {submitError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{submitError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button onClick={onBack} variant="secondary" size="lg" disabled={isSubmitting}>
          ← Back
        </Button>
        <Button
          onClick={onSubmit}
          size="lg"
          disabled={!agreed || isSubmitting}
          loading={isSubmitting}
        >
          Submit for Review
        </Button>
      </div>
    </div>
  )
}
