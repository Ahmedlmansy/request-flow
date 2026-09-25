import { ChevronDown, Filter, Link2, Search, X } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface RequestsFiltersProps { search: string; onSearchChange: (value: string) => void; onClear: () => void }

export function RequestsFilters({ search, onSearchChange, onClear }: RequestsFiltersProps) {
  const [owner, setOwner] = useState('Ahmed Mahmoud')
  const [sort, setSort] = useState('Newest')
  const [status, setStatus] = useState('All (4)')
  const [priority, setPriority] = useState('All')
  const select = (value: string, setter: (value: string) => void) => <DropdownMenuItem onClick={() => setter(value)}>{value}</DropdownMenuItem>
  return <section className="mb-6 flex flex-col gap-3 rounded-xl border border-[#e2e8f0]/30 bg-white p-4 shadow-sm">
    <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-12"><div className="relative md:col-span-4"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737686]" /><Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search requests by title, ID, or keywords..." className="h-9 border-transparent bg-[#f2f3ff] pl-9 pr-8 focus-visible:bg-white focus-visible:ring-[#2563eb]" />{search && <button onClick={() => onSearchChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#131b2e]"><X className="h-4 w-4" /></button>}</div>
      <div className="flex flex-wrap items-center justify-start gap-1.5 md:col-span-8 md:justify-end">
        <FilterMenu label={`Status: ${status}`} setValue={setStatus} options={['All (4)', 'In Progress', 'Pending', 'Completed', 'Cancelled']} />
        <FilterMenu label={`Priority: ${priority}`} setValue={setPriority} options={['All', 'High', 'Medium', 'Low']} />
        <DropdownMenu><DropdownMenuTrigger><Button variant="outline" size="sm" className="h-9 gap-2 border-transparent bg-[#f2f3ff] hover:bg-[#e2e7ff]"><Avatar className="h-5 w-5"><AvatarFallback className="bg-[#2563eb] text-[10px] text-white">AM</AvatarFallback></Avatar>Owner: <strong>{owner}</strong><ChevronDown className="h-3.5 w-3.5 text-[#737686]" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{['Ahmed Mahmoud', 'Sarah Johnson', 'Michael Chen', 'Emma Wilson'].map((item) => select(item, setOwner))}</DropdownMenuContent></DropdownMenu>
        <FilterMenu label={`Created: ${sort}`} setValue={setSort} options={['Newest', 'Oldest']} icon={<Filter className="h-3.5 w-3.5 text-[#737686]" />} />
      </div></div>
    <div className="flex flex-wrap items-center justify-between gap-2 pt-1"><div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-[11px] uppercase tracking-wider text-[#737686]">Active:</span><Badge variant="secondary" className="gap-1 bg-[#eaedff] font-normal text-[#131b2e]">Keyword: “{search || 'none'}” <button onClick={() => onSearchChange('')}><X className="h-3 w-3" /></button></Badge><Badge variant="secondary" className="gap-1 bg-[#eaedff] font-normal text-[#131b2e]">Owner: {owner.slice(0, 7)}. <button onClick={() => setOwner('All')}><X className="h-3 w-3" /></button></Badge><button onClick={() => { onClear(); setOwner('All'); setStatus('All (4)'); setPriority('All'); setSort('Newest') }} className="ml-1 text-xs font-semibold text-[#2563eb] hover:underline">Clear all filters</button></div><div className="inline-flex items-center gap-1.5 rounded bg-[#e2e7ff] px-2 py-0.5 font-mono text-xs text-[#434655]"><Link2 className="h-3.5 w-3.5 text-[#2563eb]" />?search={search || 'all'}&owner={owner.toLowerCase().replace(' ', '_')}&sort={sort.toLowerCase()}</div></div>
  </section>
}

function FilterMenu({ label, setValue, options, icon }: { label: string; setValue: (value: string) => void; options: string[]; icon?: ReactNode }) { return <DropdownMenu><DropdownMenuTrigger><Button variant="outline" size="sm" className="h-9 gap-1.5 border-transparent bg-[#f2f3ff] hover:bg-[#e2e7ff]">{icon}<span className="h-2 w-2 rounded-full bg-[#2563eb]" />{label}<ChevronDown className="h-3.5 w-3.5 text-[#737686]" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{options.map((option) => <DropdownMenuItem key={option} onClick={() => setValue(option)}>{option}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu> }
