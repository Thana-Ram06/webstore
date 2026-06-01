import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for AppVault.',
  robots: { index: false },
}

export default function CookiesPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Cookie Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">What Are Cookies?</h2>
            <p>
              Cookies are small text files that a website stores on your device when you visit. They are widely used
              to make websites work, remember your preferences, and provide usage information.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Cookies We Use</h2>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Name</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Purpose</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 font-mono text-foreground">__appvault_session</td>
                    <td className="px-4 py-3 text-muted-foreground">Keeps you signed in between visits</td>
                    <td className="px-4 py-3 text-muted-foreground">7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Essential Cookies Only</h2>
            <p>
              AppVault uses only one cookie — the session cookie listed above. It is strictly necessary for
              authentication to function. We do not use advertising, tracking, or analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Third-Party Cookies</h2>
            <p>
              Google Sign-In may set cookies on Google&apos;s domains as part of the authentication flow. These
              are governed by{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Managing Cookies</h2>
            <p>
              You can delete or block cookies through your browser settings. Note that disabling the session
              cookie will prevent you from staying signed in to AppVault.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Contact</h2>
            <p>
              Questions about our cookie use? Contact us at{' '}
              <a href="mailto:hello@appvault.com" className="text-accent hover:underline">
                hello@appvault.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
