import { api } from '@/lib/api'
import { requestSchema, type CreateRequestInput, type Request, type UpdateRequestInput } from './requests.types'

export async function fetchRequests(): Promise<Request[]> {
  const { data } = await api.get('/requests')
  return requestSchema.array().parse(data)
}

export async function fetchRequest(id: string): Promise<Request> {
  const { data } = await api.get(`/requests/${id}`)
  return requestSchema.parse(data)
}

export async function createRequest(input: CreateRequestInput): Promise<Request> {
  const { data } = await api.post('/requests', input)
  return requestSchema.parse(data)
}

export async function updateRequest(id: string, input: UpdateRequestInput): Promise<Request> {
  const { data } = await api.patch(`/requests/${id}`, input)
  return requestSchema.parse(data)
}
