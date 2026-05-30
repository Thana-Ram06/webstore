import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { getServerSession } from '@/lib/auth-cookies'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WebsTore — Discover the Best Web Apps',
    template: '%s — WebsTore',
  },
  description:
    'WebsTore is the curated directory for modern web apps. Discover SaaS tools, developer utilities, AI tools, and productivity software — reviewed by developers and makers.',
  keywords: [
    'web apps',
    'saas directory',
    'web software',
    'developer tools',
    'productivity tools',
    'ai tools',
    'no-code tools',
    'online tools',
    'saas tools',
  ],
  authors: [{ name: 'WebsTore' }],
  creator: 'WebsTore',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'WebsTore',
    title: 'WebsTore — Discover the Best Web Apps',
    description:
      'The curated directory for modern web apps. Discover SaaS tools, developer utilities, and productivity software.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebsTore — Discover the Best Web Apps',
    description:
      'The curated directory for modern web apps. Discover SaaS tools, developer utilities, and productivity software.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AuthProvider initialSession={session}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
