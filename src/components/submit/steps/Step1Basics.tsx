'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { appSubmitSchema } from '@/lib/utils/validators'
import type { SubmitDraft } from '@/types/submit'

const step1Schema = appSubmitSchema.pick({ name: true, tagline: true, websiteUrl: true })
type Step1Errors = Partial<Record<'name' | 'tagline' | 'websiteUrl', string>>

interface Step1Props {
  draft: SubmitDraft
  onChange: (partial: Partial<SubmitDraft>) => void
  onNext: () => void
}

export function Step1Basics({ draft, onChange, onNext }: Step1Props) {
  const [errors, setErrors] = useState<Step1Errors>({})

  function clearFieldError(field: keyof Step1Errors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleNext() {
    const result = step1Schema.safeParse({
      name: draft.name,
      tagline: draft.tagline,
      websiteUrl: draft.websiteUrl,
    })

    if (!result.success) {
      const fieldErrors: Step1Errors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof Step1Errors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onNext()
  }

  return (
    <div className="space-y-5">
      <Input
        label="App Name"
        value={draft.name}
        onChange={(e) => { onChange({ name: e.target.value }); clearFieldError('name') }}
        error={errors.name}
        placeholder="e.g. Linear, Figma, Notion"
        maxLength={80}
        hint="The official name of your web app"
        autoFocus
      />

      <Input
        label="Website URL"
        value={draft.websiteUrl}
        onChange={(e) => { onChange({ websiteUrl: e.target.value }); clearFieldError('websiteUrl') }}
        error={errors.websiteUrl}
        placeholder="https://example.com"
        type="url"
        leftSlot={<Globe className="h-3.5 w-3.5" aria-hidden />}
        hint="Must include https:// — the main URL users visit"
      />

      <div>
        <Input
          label="Tagline"
          value={draft.tagline}
          onChange={(e) => { onChange({ tagline: e.target.value }); clearFieldError('tagline') }}
          error={errors.tagline}
          placeholder="One compelling sentence that describes your app"
          maxLength={120}
          hint={`${draft.tagline.length}/120 · What makes your app worth trying?`}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleNext} size="lg">
          Continue →
        </Button>
      </div>
    </div>
  )
}
