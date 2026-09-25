import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface DiscardChangesDialogProps { open: boolean; requestId: string; onOpenChange: (open: boolean) => void; onDiscard: () => void }

export function DiscardChangesDialog({ open, requestId, onOpenChange, onDiscard }: DiscardChangesDialogProps) { return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="rounded-xl sm:max-w-md"><DialogHeader><div className="flex items-start gap-3"><div className="rounded-full bg-red-100 p-2 text-red-700"><AlertTriangle className="h-5 w-5" /></div><div><DialogTitle className="text-base font-semibold">Discard unsaved changes?</DialogTitle><DialogDescription className="mt-1 text-[13px]">You have unsaved changes on request <strong className="font-mono text-[#131b2e]">{requestId}</strong>. If you leave now, your modifications will be discarded.</DialogDescription></div></div></DialogHeader><DialogFooter className="gap-2 sm:gap-0"><Button variant="outline" className="rounded-lg" onClick={() => onOpenChange(false)}>Stay &amp; Keep Editing</Button><Button variant="destructive" className="rounded-lg bg-red-600 hover:bg-red-700" onClick={onDiscard}>Discard Changes</Button></DialogFooter></DialogContent></Dialog> }
