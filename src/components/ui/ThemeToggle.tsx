'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface ThemeToggleProps {
  className?: string
}

const THEMES = [
  { value: 'light',  Icon: Sun,     label: 'Light mode'  },
  { value: 'dark',   Icon: Moon,    label: 'Dark mode'   },
  { value: 'system', Icon: Monitor, label: 'System theme' },
] as const

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-8 w-[88px] rounded-md bg-muted animate-pulse',
          className,
        )}
        aria-hidden
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-lg bg-muted p-1',
        className,
      )}
      role="group"
      aria-label="Select theme"
    >
      {THEMES.map(({ value, Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={label}
          aria-pressed={theme === value}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-md transition-all',
            theme === value
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
    </div>
  )
}
