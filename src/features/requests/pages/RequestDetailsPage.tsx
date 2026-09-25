import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DiscardChangesDialog } from '@/features/requests/components/request-details/DiscardChangesDialog'
import { RequestDetailsForm } from '@/features/requests/components/request-details/RequestDetailsForm'
import { RequestDetailsHeader } from '@/features/requests/components/request-details/RequestDetailsHeader'
import { RequestDetailsSidebar } from '@/features/requests/components/request-details/RequestDetailsSidebar'
import { RequestSyncBanner } from '@/features/requests/components/request-details/RequestSyncBanner'
import { defaultRequestDetails, requestDetailId } from '@/features/requests/data/request-details.data'
import type { RequestDetailValues } from '@/features/requests/types/request-details.types'

interface RequestDetailsPageProps { onBack?: () => void; onSave?: (values: RequestDetailValues) => Promise<void> | void }

export default function RequestDetailsPage({ onBack, onSave }: RequestDetailsPageProps) {
  const [values, setValues] = useState<RequestDetailValues>(defaultRequestDetails)
  const [originalValues, setOriginalValues] = useState<RequestDetailValues>(defaultRequestDetails)
  const [isSaving, setIsSaving] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const hasUnsavedChanges = JSON.stringify(values) !== JSON.stringify(originalValues)

  const updateValue = <Key extends keyof RequestDetailValues>(key: Key, value: RequestDetailValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (onSave) await onSave(values)
      else await new Promise((resolve) => setTimeout(resolve, 900))
      setOriginalValues(values)
      toast.success('Request updated successfully', { description: 'All modifications synchronized with production API.' })
    } catch {
      toast.error('Unable to update request', { description: 'The current changes were kept locally.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) setShowDiscardDialog(true)
    else toast.info('No pending edits to cancel')
  }

  const handleDiscard = () => {
    setValues(originalValues)
    setShowDiscardDialog(false)
  }

  return <div className="min-h-screen bg-[#faf8ff] font-sans text-[#131b2e] antialiased"><div className="mx-auto max-w-7xl p-6 lg:p-8"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="flex flex-col gap-6"><RequestDetailsHeader requestId={requestDetailId} title={values.title} status={values.status} hasUnsavedChanges={hasUnsavedChanges} isSaving={isSaving} onBack={onBack} onCancel={handleCancel} onSave={handleSave} /><RequestSyncBanner /><div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="lg:col-span-7"><RequestDetailsForm values={values} onChange={updateValue} /></motion.div><motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="lg:col-span-5"><RequestDetailsSidebar /></motion.div></div></motion.div></div><DiscardChangesDialog open={showDiscardDialog} requestId={requestDetailId} onOpenChange={setShowDiscardDialog} onDiscard={handleDiscard} /></div>
}
