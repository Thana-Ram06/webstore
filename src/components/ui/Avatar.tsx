import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

/* ─────────────────────────────────────────
   Size scale
   ───────────────────────────────────────── */
const SIZE_MAP = {
  xs: { container: 'h-6 w-6',   text: 'text-[9px]',  px: 24  },
  sm: { container: 'h-8 w-8',   text: 'text-[11px]', px: 32  },
  md: { container: 'h-10 w-10', text: 'text-sm',      px: 40  },
  lg: { container: 'h-12 w-12', text: 'text-base',    px: 48  },
  xl: { container: 'h-16 w-16', text: 'text-xl',      px: 64  },
} as const

type AvatarSize = keyof typeof SIZE_MAP

/* ─────────────────────────────────────────
   Helpers
   ───────────────────────────────────────── */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

/** Deterministic color from a string — keeps the same user always the same color */
function getColorIndex(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % AVATAR_COLORS.length
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'bg-rose-100   text-rose-700   dark:bg-rose-900/40   dark:text-rose-300',
  'bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'bg-teal-100   text-teal-700   dark:bg-teal-900/40   dark:text-teal-300',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
]

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
interface AvatarProps {
  /** Photo URL — falls back to initials when null/undefined/empty */
  src?: string | null
  /** Used for initials and alt text */
  name?: string
  size?: AvatarSize
  className?: string
}

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
function Avatar({ src, name = '', size = 'md', className }: AvatarProps) {
  const { container, text, px } = SIZE_MAP[size]
  const initials = getInitials(name) || '?'
  const colorClass = AVATAR_COLORS[getColorIndex(name)]
  const altText = name ? `${name}'s avatar` : 'User avatar'

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center',
        'overflow-hidden rounded-full',
        container,
        !src && colorClass,
        className,
      )}
      aria-label={altText}
    >
      {src ? (
        <Image
          src={src}
          alt={altText}
          width={px}
          height={px}
          className="h-full w-full object-cover"
          unoptimized={src.startsWith('http')}
        />
      ) : (
        <span className={cn('font-semibold leading-none', text)} aria-hidden>
          {initials}
        </span>
      )}
    </span>
  )
}

/* ─────────────────────────────────────────
   AvatarGroup — stack of overlapping avatars
   ───────────────────────────────────────── */
interface AvatarGroupProps {
  users: Array<{ src?: string | null; name?: string }>
  max?: number
  size?: AvatarSize
  className?: string
}

function AvatarGroup({ users, max = 3, size = 'sm', className }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((user, i) => (
        <span
          key={i}
          className={cn('ring-2 ring-background', i > 0 && '-ml-2')}
        >
          <Avatar src={user.src} name={user.name} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            '-ml-2 flex items-center justify-center rounded-full ring-2 ring-background',
            'bg-muted text-muted-foreground font-medium',
            SIZE_MAP[size].container,
            SIZE_MAP[size].text,
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
export type { AvatarProps, AvatarGroupProps, AvatarSize }
