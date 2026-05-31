import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'System Status — WebsTore',
  description: 'Current operational status of all WebsTore services.',
}

const SERVICES = [
  { name: 'Web Application', description: 'webstorehq.com' },
  { name: 'Authentication', description: 'Google Sign-In & session management' },
  { name: 'Database', description: 'Firestore — read & write' },
  { name: 'File Storage', description: 'Logos, screenshots, avatars' },
  { name: 'App Submission API', description: 'Submit & moderation endpoints' },
] as const

export default function StatusPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 flex items-center gap-4">
          <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-500" aria-hidden />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">All Systems Operational</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Last checked: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className={`flex items-center justify-between px-5 py-4 ${
                i < SERVICES.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Operational
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Experiencing an issue? Contact us at{' '}
          <a href="mailto:hello@webstorehq.com" className="text-accent hover:underline">
            hello@webstorehq.com
          </a>
          .
        </p>
      </div>
    </Container>
  )
}
