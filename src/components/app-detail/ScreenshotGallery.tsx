'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { CategorySlug } from '@/types'

const CATEGORY_GRADIENT: Record<CategorySlug | string, string> = {
  'productivity':    'from-blue-500/25 via-blue-400/10 to-indigo-500/20',
  'developer-tools': 'from-emerald-500/25 via-teal-400/10 to-cyan-500/20',
  'design-tools':    'from-pink-500/25 via-rose-400/10 to-purple-500/20',
  'ai-tools':        'from-violet-500/25 via-purple-400/10 to-fuchsia-500/20',
  'collaboration':   'from-orange-500/25 via-amber-400/10 to-yellow-500/20',
  'analytics':       'from-indigo-500/25 via-blue-400/10 to-violet-500/20',
  'marketing':       'from-amber-500/25 via-yellow-400/10 to-orange-500/20',
  'finance':         'from-green-500/25 via-emerald-400/10 to-teal-500/20',
  'no-code':         'from-lime-500/25 via-green-400/10 to-emerald-500/20',
  'education':       'from-teal-500/25 via-cyan-400/10 to-sky-500/20',
  'open-source':     'from-slate-500/20 via-zinc-400/10 to-gray-500/20',
  'security':        'from-red-500/25 via-rose-400/10 to-pink-500/20',
}

const PLACEHOLDER_LABELS = ['Dashboard Overview', 'Key Features', 'Settings & More']

interface ScreenshotGalleryProps {
  screenshots: string[]
  appName: string
  categorySlug: string
}

export function ScreenshotGallery({ screenshots, appName, categorySlug }: ScreenshotGalleryProps) {
  const hasReal = screenshots.length > 0
  const slideCount = hasReal ? screenshots.length : 3
  const [active, setActive] = useState(0)
  const gradient = CATEGORY_GRADIENT[categorySlug] ?? 'from-slate-500/20 via-zinc-400/10 to-gray-500/20'

  function prev() {
    setActive((i) => (i === 0 ? slideCount - 1 : i - 1))
  }
  function next() {
    setActive((i) => (i === slideCount - 1 ? 0 : i + 1))
  }

  return (
    <div>
      {/* Main slide */}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-muted">
        <div className="aspect-video w-full">
          {hasReal ? (
            <Image
              src={screenshots[active]!}
              alt={`${appName} screenshot ${active + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          ) : (
            <div
              className={cn(
                'flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br',
                gradient,
              )}
              aria-label={`${appName} — ${PLACEHOLDER_LABELS[active]}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm text-2xl font-bold text-foreground shadow-sm">
                {appName.trim()[0]?.toUpperCase()}
              </div>
              <p className="text-sm font-medium text-foreground/70">
                {PLACEHOLDER_LABELS[active]}
              </p>
            </div>
          )}
        </div>

        {/* Nav arrows */}
        {slideCount > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous screenshot"
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5',
                'bg-background/80 backdrop-blur-sm shadow-md',
                'text-foreground opacity-0 transition-opacity group-hover:opacity-100',
                'hover:bg-background focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              onClick={next}
              aria-label="Next screenshot"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5',
                'bg-background/80 backdrop-blur-sm shadow-md',
                'text-foreground opacity-0 transition-opacity group-hover:opacity-100',
                'hover:bg-background focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </>
        )}

        {/* Slide counter */}
        {slideCount > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-background/70 px-2 py-0.5 text-xs text-foreground/80 backdrop-blur-sm">
            {active + 1} / {slideCount}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {slideCount > 1 && (
        <div className="mt-3 flex gap-2">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              aria-current={active === i}
              className={cn(
                'relative h-14 flex-1 overflow-hidden rounded-lg border transition-all duration-150',
                active === i
                  ? 'border-accent ring-2 ring-accent/30'
                  : 'border-border opacity-60 hover:opacity-100',
              )}
            >
              {hasReal ? (
                <Image
                  src={screenshots[i]!}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className={cn('h-full w-full bg-gradient-to-br', gradient)} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
