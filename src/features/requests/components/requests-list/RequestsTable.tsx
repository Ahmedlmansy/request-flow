import type { Request } from '@/features/requests/api/requests.types'
import { RequestsEmptyState } from './RequestsEmptyState'
import { RequestRow } from './RequestRow'

export function RequestsTable({ requests }: { requests: Request[] }) {
  if (!requests.length) return <RequestsEmptyState />
  return <div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Request</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th></tr></thead><tbody>{requests.map((request) => <RequestRow key={request.id} request={request} />)}</tbody></table></div>
}
