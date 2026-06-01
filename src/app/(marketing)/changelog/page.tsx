import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Changelog — AppVault',
  description: 'See what\'s new in AppVault — release notes and product updates.',
}

const RELEASES = [
  {
    version: '1.0.0',
    date: 'May 2026',
    label: 'Launch',
    highlights: [
      'Public launch of AppVault',
      'Browse and search 500+ curated web apps',
      'Google Sign-In for accounts',
      '5-step app submission wizard',
      'User dashboard with submissions and favorites',
      'Admin moderation panel',
      '12 app categories',
      'Light and dark mode',
    ],
  },
] as const

export default function ChangelogPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Changelog
        </h1>
        <p className="mb-12 text-base text-muted-foreground">
          Every update, improvement, and fix — documented.
        </p>

        <div className="space-y-12">
          {RELEASES.map((release) => (
            <div key={release.version} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-full before:w-px before:bg-border">
              <div className="absolute left-0 top-1.5 -translate-x-1/2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-accent bg-background" />

              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-bold text-foreground">v{release.version}</span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                  {release.label}
                </span>
                <span className="text-xs text-muted-foreground">{release.date}</span>
              </div>

              <ul className="space-y-1.5">
                {release.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          More updates coming soon. Follow us for announcements.
        </p>
      </div>
    </Container>
  )
}
