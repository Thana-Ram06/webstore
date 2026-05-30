import { cn } from '@/lib/utils/cn'

type ContainerSize = 'narrow' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: ContainerSize
  as?: React.ElementType
  /** Tighter horizontal padding — use inside sections that already have outer padding */
  tight?: boolean
}

const sizeMap: Record<ContainerSize, string> = {
  narrow: 'max-w-2xl',
  sm:     'max-w-3xl',
  md:     'max-w-5xl',
  lg:     'max-w-6xl',
  xl:     'max-w-7xl',
  '2xl':  'max-w-screen-2xl',
  full:   'max-w-full',
}

export function Container({
  children,
  className,
  size = 'xl',
  as: Tag = 'div',
  tight = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        tight ? 'px-4 sm:px-5' : 'px-4 sm:px-6 lg:px-8',
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
