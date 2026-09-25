import { z } from 'zod'

export const requestStatusSchema = z.enum(['pending', 'approved', 'rejected'])

export const requestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: requestStatusSchema,
  createdAt: z.string(),
})

export type RequestStatus = z.infer<typeof requestStatusSchema>
export type Request = z.infer<typeof requestSchema>
export type CreateRequestInput = Pick<Request, 'title' | 'description'>
export type UpdateRequestInput = Partial<Pick<Request, 'title' | 'description' | 'status'>>
