import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { demoRequests } from '@/features/requests/data/requests.data'
import { RequestListTable } from '@/features/requests/components/requests-list/RequestListTable'
import { RequestsAsyncStates } from '@/features/requests/components/requests-list/RequestsAsyncStates'
import { RequestsFilters } from '@/features/requests/components/requests-list/RequestsFilters'
import { RequestsHeader } from '@/features/requests/components/requests-list/RequestsHeader'
import type { RequestListItem, RequestListStatus } from '@/features/requests/types/request-list.types'

interface RequestsPageProps {
  onCreateRequest?: () => void
  onExportRequests?: () => void
  onRefreshRequests?: () => void
  onStatusChange?: (request: RequestListItem, status: RequestListStatus) => void
}

export default function RequestsPage({ onCreateRequest, onExportRequests, onRefreshRequests, onStatusChange }: RequestsPageProps) {
  const [requests, setRequests] = useState<RequestListItem[]>(demoRequests)
  const [search, setSearch] = useState('billing')
  const [showToast, setShowToast] = useState(true)
  const [rowsPerPage, setRowsPerPage] = useState('20')

  const handleStatusChange = (request: RequestListItem, status: RequestListStatus) => {
    setRequests((current) => current.map((item) => item.id === request.id ? { ...item, status } : item))
    onStatusChange?.(request, status)
  }

  const handleResetFilters = () => setSearch('')

  return <div className="min-h-screen bg-[#faf8ff] font-sans text-[#131b2e] antialiased"><div className="mx-auto max-w-7xl p-6 md:p-8">
    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><RequestsHeader onCreate={onCreateRequest} onExport={onExportRequests} onRefresh={onRefreshRequests} /></motion.div>
    <AnimatePresence>{showToast && <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className="mb-4 flex items-center justify-between gap-4 rounded-xl border-l-4 border-l-emerald-500 bg-white p-4 shadow-md"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><RefreshCw className="h-4 w-4" /></div><div><p className="text-sm font-semibold">Status mutation synchronized with API</p><p className="text-xs text-[#434655]">REQ-1042 successfully updated from “Pending” to “In Progress”.</p></div></div><div className="flex items-center gap-2"><span className="font-mono text-xs text-[#737686]">HTTP 200 OK</span><Button variant="ghost" size="icon" onClick={() => setShowToast(false)} className="h-7 w-7"><X className="h-4 w-4" /></Button></div></motion.div>}</AnimatePresence>
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}><RequestsFilters search={search} onSearchChange={setSearch} onClear={handleResetFilters} /></motion.div>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}><RequestListTable requests={requests} rowsPerPage={rowsPerPage} onStatusChange={handleStatusChange} onRowsPerPageChange={setRowsPerPage} /></motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}><RequestsAsyncStates onReset={handleResetFilters} /></motion.div>
  </div></div>
}
