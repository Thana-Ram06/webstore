import { Check } from 'lucide-react'
import type { AppDetail } from '@/types/detail'

interface AboutSectionProps {
  app: AppDetail
}

export function AboutSection({ app }: AboutSectionProps) {
  const paragraphs = app.description.split('\n\n').filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          About {app.name}
        </h2>
        <div className="mt-3 space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Features */}
      {app.features.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground">Key Features</h3>
          <ul className="mt-3 space-y-2">
            {app.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-2.5 w-2.5 text-accent" aria-hidden />
                </span>
                <span className="text-sm text-muted-foreground">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {app.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground">Tags</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
