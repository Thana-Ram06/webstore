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
    default: 'AppVault — Discover the Best Web Apps',
    template: '%s — AppVault',
  },
  description:
    'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
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
  authors: [{ name: 'AppVault' }],
  creator: 'AppVault',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AppVault',
    title: 'AppVault — Discover the Best Web Apps',
    description:
      'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AppVault' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppVault — Discover the Best Web Apps',
    description:
      'Discover, save, and submit the best web applications. Explore AI tools, productivity apps, developer tools, design platforms, and more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
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
