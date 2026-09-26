import type {  RequestDetailStatus, RequestDetailValues } from '@/features/requests/types/request-details.types'

export const requestDetailId = 'REQ-1042'

export const defaultRequestDetails: RequestDetailValues = {
  title: 'Update billing information and invoicing cadence',
  status: 'pending',
  priority: 'high',
  owner: 'ahmed',
}

export const statusConfig: Record<RequestDetailStatus, { label: string; className: string; dot: string }> = {
  "": { label: 'Pending', className: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-600' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-600' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-600' },
}


