import type { Metadata } from 'next'
import { APP_CONFIG } from '@/lib/constants/config'
import { SubmissionWizard } from '@/components/submit/SubmissionWizard'

export const metadata: Metadata = {
  title: 'Submit Your App',
  description:
    `Submit your web app to ${APP_CONFIG.name}. Share it with thousands of developers and makers who discover new tools every day.`,
  openGraph: {
    title: `Submit Your App — ${APP_CONFIG.name}`,
    description: `List your web app on ${APP_CONFIG.name} and reach thousands of developers and makers.`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Submit Your App — ${APP_CONFIG.name}`,
    description: `List your web app on ${APP_CONFIG.name} and reach thousands of developers and makers.`,
  },
  robots: {
    index: false,
  },
}

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Submit Your Web App
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Share your app with thousands of developers and makers on {APP_CONFIG.name}.
        </p>
      </div>

      <SubmissionWizard />
    </main>
  )
}
