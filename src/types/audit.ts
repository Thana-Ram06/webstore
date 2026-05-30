import type { Timestamp, UserRole } from './common'

export type AuditAction =
  | 'approve'
  | 'reject'
  | 'feature'
  | 'unfeature'
  | 'roleChange'
  | 'delete'

export interface AuditLogEntry {
  id: string
  action: AuditAction
  performedBy: string
  timestamp: Timestamp
  // Contextual — only one of these will be set per entry
  appId?: string
  userId?: string
  // Supporting detail
  newRole?: UserRole
  reason?: string | null
}
