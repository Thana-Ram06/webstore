import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Submission Guidelines — AppVault',
  description: 'Guidelines for submitting a web app to AppVault.',
}

export default function GuidelinesPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Submission Guidelines</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Read these guidelines before submitting your web app to AppVault.
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. Eligibility</h2>
            <p>
              Submissions must be web applications that are publicly accessible via a URL. The app must be fully
              functional — no login walls on the primary feature, no broken pages, and no placeholder content.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. Ownership</h2>
            <p>
              You must be the developer, founder, or an authorized representative of the app you are submitting.
              Do not submit apps you did not build or do not have permission to list.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. Accuracy</h2>
            <p>
              All information — name, tagline, description, category, pricing, and website URL — must be accurate
              and up to date. Misleading descriptions or incorrect categories will result in rejection or removal.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">4. Content Standards</h2>
            <p>
              We do not accept apps that promote illegal activity, contain adult-only content, spread
              misinformation, or exist solely for spam or phishing. AppVault reserves the right to reject or
              remove any app at our discretion.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">5. Media Assets</h2>
            <p>
              Your app logo should be a square image at least 200×200 px. Screenshots should accurately
              represent the app&apos;s current interface. Do not use screenshots from other apps or
              AI-generated mockups that misrepresent the product.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Review Process</h2>
            <p>
              All submissions are reviewed by the AppVault team before going live. We typically review
              submissions within 2–3 business days. You will be notified by email of the outcome.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">7. Re-submissions</h2>
            <p>
              If your submission is rejected, you may address the feedback and resubmit. Repeated submissions
              of the same rejected app without changes may result in your account being restricted.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">8. Questions</h2>
            <p>
              If you have questions about the submission process, contact us at{' '}
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
