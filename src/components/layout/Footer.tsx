import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

/* ─────────────────────────────────────────
   Link data
   ───────────────────────────────────────── */
const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Browse Web Apps', href: '/apps' },
      { label: 'Submit a Web App', href: '/submit' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'About AppVault', href: '/about' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'AI Tools', href: '/apps?category=ai-tools' },
      { label: 'Developer Tools', href: '/apps?category=developer-tools' },
      { label: 'Productivity', href: '/apps?category=productivity' },
      { label: 'Design Tools', href: '/apps?category=design-tools' },
      { label: 'All Categories', href: '/categories' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Status', href: '/status' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
] as const

/* ─────────────────────────────────────────
   Social icons
   ───────────────────────────────────────── */
const SOCIAL = [
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Product Hunt',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 0 0 0-3.6M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0m1.604 14.4H10.2V18H7.8V6h5.804a4.2 4.2 0 0 1 0 8.4" />
      </svg>
    ),
  },
] as const

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-14 md:py-16">

          {/* Top section: brand + columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-6">

            {/* Brand — spans 2 of 6 cols */}
            <div className="col-span-2 md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2" aria-label="AppVault home">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
                    <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
                    <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
                    <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-foreground">AppVault</span>
              </Link>
              <p className="mt-3.5 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                The Home of Modern Web Apps. Discover, save, and review the best web tools.
              </p>

              {/* Social */}
              <div className="mt-5 flex items-center gap-2">
                {SOCIAL.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-muted-foreground/30 hover:text-foreground"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns — 4 of 6 cols */}
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <FooterSection title={col.title} links={col.links} />
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AppVault. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground">The Home of Modern Web Apps</p>
              <ThemeToggle />
            </div>
          </div>

        </div>
      </Container>
    </footer>
  )
}

/* ─────────────────────────────────────────
   FooterSection
   ───────────────────────────────────────── */
interface FooterSectionProps {
  title: string
  links: readonly { label: string; href: string }[]
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
