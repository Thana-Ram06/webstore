import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AppVault.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>
              When you create an account, we collect your email address and display name via Google Sign-In. When
              you submit an app, we store the information you provide including app name, URL, description, and
              category. We also collect standard usage data such as page views.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>
              We use your information to operate the AppVault platform — to display your submissions, manage your
              account, and moderate content. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">3. Google Sign-In</h2>
            <p>
              We use Google Sign-In for authentication. When you sign in with Google, Google shares your name,
              email address, and profile photo with us. Please review{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>{' '}
              for details on how Google handles your data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">4. Firebase and Data Storage</h2>
            <p>
              AppVault uses Google Firebase to store data. Your data is stored in Firebase Firestore and is subject
              to Google&apos;s data processing terms. Data is stored in the United States.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Cookies</h2>
            <p>
              We use a session cookie (<code>__appvault_session</code>) to keep you signed in. This cookie is
              essential for the service to function and does not track you across other websites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Data Retention</h2>
            <p>
              We retain your account data for as long as your account exists. Submitted app data may remain on the
              platform after deletion for moderation and audit purposes. You may request deletion of your account
              by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by contacting
              us. We will respond to requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify users of significant changes via
              email or a notice on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">9. Contact</h2>
            <p>
              For privacy-related questions or requests, contact us at{' '}
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
