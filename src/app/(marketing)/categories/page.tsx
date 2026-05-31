import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles, Zap, Code2, Palette, Megaphone,
  DollarSign, BarChart2, Users, Blocks, BookOpen,
  GitFork, Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { CATEGORIES } from '@/lib/constants/categories'
import { cn } from '@/lib/utils/cn'

export const metadata: Metadata = {
  title: 'Browse by Category — WebsTore',
  description: 'Explore all categories of web apps on WebsTore — AI tools, developer utilities, design software, productivity apps, and more.',
}

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Zap, Code2, Palette, Megaphone,
  DollarSign, BarChart2, Users, Blocks, BookOpen,
  Github: GitFork,
  Shield,
}

export default function CategoriesPage() {
  return (
    <Container className="py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse by Category
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Find the right web app for every job — {CATEGORIES.length} categories, curated by the community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName]
          return (
            <Link
              key={cat.slug}
              href={`/apps?category=${cat.slug}`}
              className={cn(
                'group flex items-start gap-4 rounded-xl border border-border bg-card p-5',
                'transition-all duration-200',
                'hover:-translate-y-0.5 hover:border-border/60 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <div
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${cat.accentColor}18`,
                  color: cat.accentColor,
                }}
              >
                {Icon && <Icon className="h-5 w-5" aria-hidden />}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground group-hover:text-foreground">
                  {cat.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <p
                  className="mt-2 text-xs font-medium"
                  style={{ color: cat.accentColor }}
                >
                  Browse apps →
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}
