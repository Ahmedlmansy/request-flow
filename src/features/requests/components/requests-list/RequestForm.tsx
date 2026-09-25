import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createRequest } from '@/features/requests/api/requests.api'
import { requestFormSchema, type RequestFormValues } from '@/features/requests/schemas/request.schema'

export function RequestForm({ onCreated }: { onCreated?: () => void }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RequestFormValues>({ resolver: zodResolver(requestFormSchema), defaultValues: { title: '', description: '' } })
  const onSubmit = handleSubmit(async (values) => { await createRequest(values); reset(); onCreated?.() })
  return <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4"><h2 className="font-semibold">New request</h2><label className="grid gap-1 text-sm">Title<input {...register('title')} className="h-10 rounded-md border border-slate-300 px-3" />{errors.title && <span role="alert" className="text-red-600">{errors.title.message}</span>}</label><label className="grid gap-1 text-sm">Description<textarea {...register('description')} className="min-h-24 rounded-md border border-slate-300 p-3" />{errors.description && <span role="alert" className="text-red-600">{errors.description.message}</span>}</label><button type="submit" disabled={isSubmitting} className="h-10 w-fit rounded-md bg-blue-700 px-4 text-sm font-medium text-white disabled:opacity-50">{isSubmitting ? 'Creating...' : 'Create request'}</button></form>
}
