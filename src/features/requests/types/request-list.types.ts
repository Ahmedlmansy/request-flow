import type { LucideIcon } from 'lucide-react'

export type RequestListStatus =
  | 'in_progress'
  | 'completed'
  | 'pending'
  | 'cancelled'
  | 'updating'

export type RequestPriority = 'high' | 'medium' | 'low'

export interface RequestOwner {
  name: string
  initials?: string
  avatar?: string
}

export interface RequestListItem {
  id: string
  title: string
  department: string
  status: RequestListStatus
  priority: RequestPriority
  owner: RequestOwner
  created: string
  updated: string
  isOptimistic?: boolean
}

export interface StatusPresentation {
  label: string
  className: string
  dot?: string
  icon?: LucideIcon
}

export interface PriorityPresentation {
  label: string
  className: string
  icon: LucideIcon
}
