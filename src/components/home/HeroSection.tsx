'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Sparkles, Code2, Palette, Zap, Blocks, GitFork } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const SEARCH_PLACEHOLDERS = [
  'Search AI writing tools...',
  'Search Figma alternatives...',
  'Search open-source editors...',
  'Search no-code builders...',
  'Search developer utilities...',
]

const TRENDING_SEARCHES = [
  { label: 'AI writing tools', q: 'ai writing' },
  { label: 'Figma alternatives', q: 'figma alternative' },
  { label: 'Open-source tools', q: 'open source' },
  { label: 'Team collaboration', q: 'collaboration' },
  { label: 'No-code builders', q: 'no-code' },
]

const CATEGORY_SHORTCUTS = [
  { slug: 'ai-tools', name: 'AI Tools', Icon: Sparkles, color: '#8B5CF6' },
  { slug: 'developer-tools', name: 'Dev Tools', Icon: Code2, color: '#10B981' },
  { slug: 'design-tools', name: 'Design', Icon: Palette, color: '#EC4899' },
  { slug: 'productivity', name: 'Productivity', Icon: Zap, color: '#3B82F6' },
  { slug: 'no-code', name: 'No-Code', Icon: Blocks, color: '#84CC16' },
  { slug: 'open-source', name: 'Open Source', Icon: GitFork, color: '#94A3B8' },
]

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % SEARCH_PLACEHOLDERS.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/apps?q=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.025,
        }}
        aria-hidden
      />
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[700px] w-[900px] -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--accent-subtle)) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3 w-3" aria-hidden />
            500+ curated web apps
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-display mt-5 text-center text-foreground">
          The Home of<br />Modern Web Apps.
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Discover, review, and save the best tools across AI, design, development, and beyond — curated by developers and makers.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/apps"
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5',
              'text-sm font-medium text-accent-foreground',
              'transition-all duration-150 hover:bg-accent-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Explore Web Apps
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href="/submit"
            className={cn(
              'inline-flex items-center rounded-full border border-border px-6 py-2.5',
              'text-sm font-medium text-foreground',
              'transition-colors hover:bg-muted',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Submit Your App
          </Link>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mt-10" role="search">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              aria-label="Search web apps"
              className={cn(
                'h-14 w-full rounded-2xl border border-border bg-card pl-11 pr-28',
                'text-sm text-foreground placeholder:text-muted-foreground/55',
                'shadow-sm transition-all duration-200',
                'focus:border-accent/40 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring/25',
              )}
            />
            <button
              type="submit"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground',
                'transition-colors hover:bg-accent-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              Search
            </button>
          </div>
        </form>

        {/* Trending searches */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground/50" aria-hidden>
            Trending:
          </span>
          {TRENDING_SEARCHES.map(({ label, q }) => (
            <Link
              key={q}
              href={`/apps?q=${encodeURIComponent(q)}`}
              className={cn(
                'rounded-full border border-border/70 bg-card px-3 py-1',
                'text-xs text-muted-foreground',
                'transition-all hover:border-accent/40 hover:bg-accent-subtle hover:text-accent',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Category shortcuts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_SHORTCUTS.map(({ slug, name, Icon, color }) => (
            <Link
              key={slug}
              href={`/apps?category=${slug}`}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5',
                'text-xs font-medium text-foreground/75',
                'transition-all hover:border-border hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-3 w-3" style={{ color }} aria-hidden />
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
