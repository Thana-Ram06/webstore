'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

const SIZE_MAP = {
  sm: { px: 36, container: 'h-9 w-9',   text: 'text-sm'  },
  md: { px: 44, container: 'h-11 w-11', text: 'text-base' },
  lg: { px: 56, container: 'h-14 w-14', text: 'text-xl'  },
  xl: { px: 80, container: 'h-20 w-20', text: 'text-2xl' },
} as const

type LogoSize = keyof typeof SIZE_MAP

const FALLBACK_COLORS = [
  'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  'bg-blue-100   text-blue-600   dark:bg-blue-900/30   dark:text-blue-400',
  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  'bg-rose-100   text-rose-600   dark:bg-rose-900/30   dark:text-rose-400',
  'bg-amber-100  text-amber-600  dark:bg-amber-900/30  dark:text-amber-400',
  'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  'bg-teal-100   text-teal-600   dark:bg-teal-900/30   dark:text-teal-400',
  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
] as const

function colorIndex(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return Math.abs(h) % FALLBACK_COLORS.length
}

interface AppLogoProps {
  src: string
  name: string
  size?: LogoSize
  className?: string
}

export function AppLogo({ src, name, size = 'md', className }: AppLogoProps) {
  const [failed, setFailed] = useState(false)
  const { px, container, text } = SIZE_MAP[size]
  const colorClass = FALLBACK_COLORS[colorIndex(name)]
  const initial = name.trim()[0]?.toUpperCase() ?? '?'
  const showFallback = !src || failed

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl',
        container,
        showFallback && colorClass,
        className,
      )}
    >
      {showFallback ? (
        <span className={cn('font-semibold leading-none', text)} aria-hidden>
          {initial}
        </span>
      ) : (
        <Image
          src={src}
          alt={`${name} logo`}
          width={px}
          height={px}
          className="h-full w-full object-cover"
          unoptimized={src.startsWith('http')}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
