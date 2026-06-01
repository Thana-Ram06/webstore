import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AppVault.',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Terms of Service</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AppVault, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">2. Use of the Service</h2>
            <p>
              AppVault is an app discovery platform. You may browse, submit, and review web applications. You agree
              not to submit spam, malicious links, or misleading content. We reserve the right to remove any
              submission at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account. You must provide accurate information when creating an
              account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">4. Submitted Content</h2>
            <p>
              By submitting an application, you represent that you have the right to list the app and that the
              information provided is accurate. AppVault reserves the right to review, approve, or reject any
              submission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Intellectual Property</h2>
            <p>
              The AppVault platform, logo, and original content are the intellectual property of AppVault. App
              names, logos, and descriptions remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Disclaimer of Warranties</h2>
            <p>
              AppVault is provided &quot;as is&quot; without warranties of any kind. We do not warrant that the service
              will be uninterrupted, error-free, or that any particular app listed is safe or suitable for your use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AppVault shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">9. Contact</h2>
            <p>
              For questions about these terms, please contact us at{' '}
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
