import { Download, Plus, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface RequestsHeaderProps {
  onCreate?: () => void
  onExport?: () => void
  onRefresh?: () => void
}

export function RequestsHeader({ onCreate, onExport, onRefresh }: RequestsHeaderProps) {
  return <header className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
    <div>
      <div className="flex items-center gap-2"><h1 className="text-[28px] font-semibold tracking-tight leading-9">Requests</h1><Badge variant="secondary" className="bg-[#d0e1fb] font-mono text-xs text-[#0b1c30]">v2.4</Badge></div>
      <p className="mt-0.5 text-sm text-[#434655]">Manage, track, and triage business requests across operations.</p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f3ff] px-2.5 py-1 text-xs text-[#434655] shadow-sm"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span><span className="font-mono">Revalidated 2s ago</span></div>
      <Button variant="outline" size="sm" onClick={onExport} className="h-9 gap-1.5 border-[#c3c6d7] bg-white hover:bg-[#f2f3ff]"><Download className="h-4 w-4" />Export CSV</Button>
      <Button variant="outline" size="icon" onClick={onRefresh} className="h-9 w-9 border-[#c3c6d7] bg-white hover:bg-[#f2f3ff]" title="Refetch requests"><RefreshCw className="h-4 w-4" /></Button>
      <Button size="sm" onClick={onCreate} className="h-9 gap-1.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8]"><Plus className="h-4 w-4" />Create Request</Button>
    </div>
  </header>
}
