import type { RequestStatus } from '@/features/requests/api/requests.types'

type Props = { value: RequestStatus | 'all'; onChange: (value: RequestStatus | 'all') => void }

export function RequestStatusSelect({ value, onChange }: Props) {
  return <select aria-label="Filter by status" value={value} onChange={(event) => onChange(event.target.value as RequestStatus | 'all')} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
}
