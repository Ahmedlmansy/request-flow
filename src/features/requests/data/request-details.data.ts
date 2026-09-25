import type { RequestAuditEntry, RequestDetailMetadata, RequestDetailStatus, RequestDetailValues } from '@/features/requests/types/request-details.types'

export const requestDetailId = 'REQ-1042'

export const defaultRequestDetails: RequestDetailValues = {
  title: 'Update billing information and invoicing cadence',
  status: 'pending',
  priority: 'high',
  owner: 'ahmed',
  description: 'Client requested updating invoicing terms from Net-30 to Net-45 alongside updating billing contact to accounting@acme-corp.com.',
}

export const statusConfig: Record<RequestDetailStatus, { label: string; className: string; dot: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-600' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-600' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-600' },
}

export const metadata: RequestDetailMetadata[] = [
  { label: 'Created At', value: 'Sep 24, 2026, 10:32 AM', sub: '2 hours ago' },
  { label: 'Last Updated', value: 'Sep 24, 2026, 12:45 PM', sub: '8 minutes ago' },
  { label: 'Created By', value: 'Sarah Jenkins', sub: '(Operations Lead)' },
  { label: 'Request Source', value: 'API / Web Portal' },
  { label: 'Reference Hash', value: '0x8f4c...91a2' },
]

export const auditEntries: RequestAuditEntry[] = [
  { title: "Status set to 'Pending'", time: '12:45 PM', description: 'Modified by Ahmed Mahmoud via Operational Console.', color: 'bg-[#004ac6]' },
  { title: "Priority elevated to 'High'", time: '11:10 AM', description: 'Automated rule escalation applied based on SLA tier.', color: 'bg-[#0053db]' },
  { title: 'Request Created', time: '10:32 AM', description: 'Sarah Jenkins submitted intake ticket from Customer Success.', color: 'bg-[#505f76]' },
]
