import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export function CtaSection() {
  return (
    <section className="py-16">
      <Container size="lg">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 text-center sm:py-20">
          {/* Dot grid texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden
          />
          {/* Accent glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(239 84% 67% / 0.2) 0%, transparent 60%)',
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                <Sparkles className="h-3 w-3 text-amber-400" aria-hidden />
                Join 500+ apps already listed
              </span>
            </div>

            <h2 className="font-serif text-4xl font-normal text-white sm:text-5xl">
              Built a great web app?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/50">
              Share it with thousands of developers and makers who are always looking for their next favorite tool.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Submit Your App
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Browse Apps
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
