import { ExternalLink, Check } from 'lucide-react'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { PricingBadge } from '@/components/cards/subcomponents/PricingBadge'
import { CategoryPill } from '@/components/cards/subcomponents/CategoryPill'
import { CATEGORIES } from '@/lib/constants/categories'
import { APP_CONFIG } from '@/lib/constants/config'
import type { SubmitDraft } from '@/types/submit'
import type { CategorySlug, PricingModel } from '@/types'

const VALID_SLUGS = new Set(CATEGORIES.map((c) => c.slug))

interface SubmissionPreviewProps {
  draft: SubmitDraft
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm text-foreground">{value}</dd>
    </div>
  )
}

export function SubmissionPreview({ draft }: SubmissionPreviewProps) {
  const validCategory = VALID_SLUGS.has(draft.categorySlug as CategorySlug)
  const validPricing = (APP_CONFIG.pricingModels as readonly string[]).includes(draft.pricing)
  const domain = (() => {
    try { return new URL(draft.websiteUrl).hostname.replace(/^www\./, '') } catch { return draft.websiteUrl }
  })()

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* App header */}
      <div className="flex items-start gap-4 border-b border-border p-5">
        <AppLogo
          src={draft.logoUrl}
          name={draft.name || 'App'}
          size="xl"
          className="shrink-0 rounded-2xl ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            {draft.name || <span className="text-muted-foreground italic">App Name</span>}
          </h3>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {draft.tagline || <span className="italic">No tagline</span>}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {validCategory && (
              <CategoryPill slug={draft.categorySlug as CategorySlug} />
            )}
            {validPricing && (
              <PricingBadge pricing={draft.pricing as PricingModel} size="xs" />
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border-b border-border px-5">
        <dl className="divide-y divide-border">
          {draft.websiteUrl && (
            <Row
              label="Website"
              value={
                <a
                  href={draft.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  {domain}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              }
            />
          )}
          {draft.platforms.length > 0 && (
            <Row
              label="Platform"
              value={
                <div className="flex flex-wrap justify-end gap-1">
                  {draft.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium"
                    >
                      {APP_CONFIG.platformLabels[p as keyof typeof APP_CONFIG.platformLabels] ?? p}
                    </span>
                  ))}
                </div>
              }
            />
          )}
          {draft.pricingNote && (
            <Row label="Pricing note" value={draft.pricingNote} />
          )}
          {draft.tags.length > 0 && (
            <Row
              label="Tags"
              value={
                <div className="flex flex-wrap justify-end gap-1">
                  {draft.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              }
            />
          )}
          <Row
            label="Screenshots"
            value={
              draft.screenshotUrls.length > 0
                ? `${draft.screenshotUrls.length} uploaded`
                : <span className="text-muted-foreground/70 italic">None</span>
            }
          />
        </dl>
      </div>

      {/* Description */}
      {draft.description && (
        <div className="border-b border-border px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Description
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {draft.description}
          </p>
        </div>
      )}

      {/* Features */}
      {draft.features.length > 0 && (
        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Key Features
          </p>
          <ul className="space-y-1.5">
            {draft.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                <span className="text-foreground">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
