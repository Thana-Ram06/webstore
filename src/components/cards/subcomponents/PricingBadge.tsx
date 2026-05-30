import { Badge } from '@/components/ui/Badge'
import { APP_CONFIG } from '@/lib/constants/config'
import type { PricingModel } from '@/types'

const VARIANT_MAP = {
  free:          'free',
  freemium:      'freemium',
  paid:          'paid',
  'open-source': 'open-source',
} as const satisfies Record<PricingModel, string>

interface PricingBadgeProps {
  pricing: PricingModel
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function PricingBadge({ pricing, size = 'sm', className }: PricingBadgeProps) {
  return (
    <Badge
      variant={VARIANT_MAP[pricing]}
      size={size}
      className={className}
    >
      {APP_CONFIG.pricingLabels[pricing]}
    </Badge>
  )
}
