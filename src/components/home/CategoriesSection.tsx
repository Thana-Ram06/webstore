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

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Zap, Code2, Palette, Megaphone,
  DollarSign, BarChart2, Users, Blocks, BookOpen,
  Github: GitFork,
  Shield,
}

interface CategoriesSectionProps {
  counts: Record<string, number>
}

export function CategoriesSection({ counts }: CategoriesSectionProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Browse by Category
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Find the right tool for every job
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.iconName]
            const appCount = counts[cat.slug] ?? 0
            return (
              <Link
                key={cat.slug}
                href={`/apps?category=${cat.slug}`}
                className={cn(
                  'group flex flex-col gap-3 rounded-xl border border-border bg-card p-4',
                  'transition-all duration-200',
                  'hover:-translate-y-0.5 hover:border-border/60 hover:shadow-md',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                )}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${cat.accentColor}18`,
                    color: cat.accentColor,
                  }}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-foreground">
                    {cat.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {appCount} {appCount === 1 ? 'app' : 'apps'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
