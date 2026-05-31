import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'About WebsTore',
  description: 'Learn about WebsTore — the home of modern web apps, where developers and makers discover the best tools.',
}

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About WebsTore
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          The Home of Modern Web Apps — a curated directory built for developers and makers who are always searching for their next favorite tool.
        </p>

        <div className="space-y-10 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Our Mission</h2>
            <p>
              The web is full of incredible applications — but finding the right one takes time. WebsTore exists to solve that problem. We curate, organize, and surface the best web apps across AI, development, design, productivity, and beyond, so you can spend less time searching and more time building.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">What We Offer</h2>
            <ul className="space-y-2">
              {[
                'A curated directory of 500+ web apps reviewed by real developers',
                'Organized categories to help you find the right tool fast',
                'Honest ratings and community reviews',
                'A simple submission flow to get your web app in front of thousands',
                'Favorites and saved collections for the tools you love',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Who We Are</h2>
            <p>
              WebsTore was built by a small team of developers who were frustrated with scattered, outdated app directories. We believe great web apps deserve great discoverability — and that the community is the best judge of what's worth using.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Submit Your App</h2>
            <p className="mb-4">
              Built something great? We accept submissions from founders, developers, and makers. Every submission is reviewed by our team before going live.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Submit a Web App
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Contact</h2>
            <p>
              Questions, partnership inquiries, or feedback? Reach us at{' '}
              <a href="mailto:hello@webstorehq.com" className="text-accent hover:underline">
                hello@webstorehq.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
