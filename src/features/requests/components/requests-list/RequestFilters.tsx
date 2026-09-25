import type { RequestStatus } from '../../api/requests.types';
import { RequestSearch } from './RequestSearch'
import { RequestSort } from './RequestSort'
import { RequestStatusSelect } from './RequestStatusSelect'

type Props = { search: string; onSearch: (value: string) => void; status: RequestStatus | 'all'; onStatus: (value: RequestStatus | 'all') => void; sort: 'newest' | 'oldest'; onSort: (value: 'newest' | 'oldest') => void }

export function RequestFilters({ search, onSearch, status, onStatus, sort, onSort }: Props) {
  return <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]"><RequestSearch value={search} onChange={onSearch} /><RequestStatusSelect value={status} onChange={onStatus} /><RequestSort value={sort} onChange={onSort} /></div>
}
