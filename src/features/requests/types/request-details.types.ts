import type { ReactNode } from 'react'

export type RequestDetailStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type RequestDetailPriority = 'high' | 'medium' | 'low'

export interface RequestDetailValues {
  title: string
  status: RequestDetailStatus
  priority: RequestDetailPriority
  owner: string
  description: string
}

export interface RequestDetailMetadata {
  label: string
  value: ReactNode
  sub?: string
}

export interface RequestAuditEntry {
  title: string
  time: string
  description: string
  color: string
}
