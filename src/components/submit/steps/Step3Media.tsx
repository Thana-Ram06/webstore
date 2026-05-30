'use client'

import { LogoUploader } from '@/components/submit/LogoUploader'
import { ScreenshotUploader } from '@/components/submit/ScreenshotUploader'
import { Button } from '@/components/ui/Button'
import type { SubmitDraft } from '@/types/submit'

interface Step3Props {
  draft: SubmitDraft
  onChange: (partial: Partial<SubmitDraft>) => void
  onNext: () => void
  onBack: () => void
}

export function Step3Media({ draft, onChange, onNext, onBack }: Step3Props) {
  const canProceed = Boolean(draft.logoUrl)

  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-foreground">
            App Logo <span className="text-destructive">*</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Displayed in search results, listings, and the app detail page.
          </p>
        </div>
        <LogoUploader
          logoUrl={draft.logoUrl}
          appName={draft.name}
          draftId={draft.draftId}
          onUpload={(url) => onChange({ logoUrl: url })}
          onRemove={() => onChange({ logoUrl: '' })}
          required
        />
      </div>

      {/* Screenshots */}
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-foreground">
            Screenshots{' '}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Show your app in action. Apps with screenshots get more visibility.
          </p>
        </div>
        <ScreenshotUploader
          screenshotUrls={draft.screenshotUrls}
          draftId={draft.draftId}
          onUpdate={(urls) => onChange({ screenshotUrls: urls })}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button onClick={onBack} variant="secondary" size="lg">
          ← Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          disabled={!canProceed}
          title={!canProceed ? 'Upload a logo to continue' : undefined}
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
