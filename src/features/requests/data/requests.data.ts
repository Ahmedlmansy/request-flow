import { ArrowDown, CheckCircle2, Flag, Minus, XCircle } from 'lucide-react'
import type { PriorityPresentation, RequestListItem, RequestListStatus, StatusPresentation } from '@/features/requests/types/request-list.types'

export const demoRequests: RequestListItem[] = [
  { id: 'REQ-1042', title: 'Update billing information and invoicing cadence', department: 'Finance Operations', status: 'in_progress', priority: 'high', owner: { name: 'Ahmed Mahmoud', initials: 'AM' }, created: 'Sep 24, 2026 10:32 AM', updated: 'Just now' },
  { id: 'REQ-1041', title: 'New employee workstation provisioning - IT setup', department: 'IT Systems', status: 'updating', priority: 'high', owner: { name: 'Sarah Johnson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJb03s7CKopBs3xvGXnJbov4hMxnMpMHYwtLvY0YxKpcft122w6xgi8qPupynmWw-ZYHT4MS5uDdApHu9z83o2fjNu-UfScdjv3JoXNgYVhmeoEOy70e8x9qW58hyQiV6fO_Bo6DC7S-_nIIWbptns2KZImTu08OUzYDRBbtwk2kFunOudUI54mGq0Ww5VsYGU0kwqfa0-Nyjo2M2kAbW3pOj6fpXQSihz91Cl5z1qW0ZykVSw9J1v' }, created: 'Sep 24, 2026 09:15 AM', updated: '14 mins ago', isOptimistic: true },
  { id: 'REQ-1039', title: 'Quarterly vendor compliance audit review', department: 'Legal & Risk', status: 'completed', priority: 'medium', owner: { name: 'Michael Chen', initials: 'MC' }, created: 'Sep 23, 2026', updated: 'Sep 24, 2026' },
  { id: 'REQ-1038', title: 'SaaS subscription seat expansion for Sales team', department: 'Procurement', status: 'pending', priority: 'low', owner: { name: 'Emma Wilson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwoo1pKYVJiYwzmQkK_ZtjYNboWKRvo1aHhSsaUmIvxqgBKYC0IH3rx_O3YUMUp-h-MUFMpRI95og0Im_1FMyVAIXV2_RXh87pIypZKO1NTS9hkfP02_iA-WqcsQzxEqiF4Vk15CUGHTOF57i9eIk17tRaG7XxbOW8a14aY8C1GTuKP1Ur36fKwPk8pXcSH29b46KafK1WycnguHJZZ7RKYgiEBIDNt_aKwIBdbfder8VO_2R9PhYy' }, created: 'Sep 22, 2026', updated: 'Sep 22, 2026' },
  { id: 'REQ-1035', title: 'Marketing attribution pipeline migration', department: 'Growth Analytics', status: 'cancelled', priority: 'low', owner: { name: 'David Brown', initials: 'DB' }, created: 'Sep 21, 2026', updated: 'Sep 23, 2026' },
  { id: 'REQ-1034', title: 'Annual SOC2 compliance penetration testing schedule', department: 'Security & InfoSec', status: 'in_progress', priority: 'medium', owner: { name: 'Sarah Johnson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtut8JRgGsNbjt3L4CS3q4QN2b8cvKcs-K64rddVmJ3Y_0nEswW6PstbviN6cZy8pqoDUTInE04wdzmzgPrU6SYI54-Qa2zhcv3iE4bo4eSgY1_3xzvQVJ_HKL4H3bVc_PgYG2kRo9mNX7C-ZV8l__FF5QhSmvMK96jVCOEBM4cIWGE1FSntDSZNM-NWAaIxEm3gs_otkZ0voAYjxfI6a4x7binDew2vADM4f9AZq3LZFoBB0ikn23' }, created: 'Sep 20, 2026', updated: 'Sep 23, 2026' },
]

export const statusConfig: Record<RequestListStatus, StatusPresentation> = {
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-600' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  pending: { label: 'Pending', className: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-500' },
  cancelled: { label: 'Cancelled', className: 'bg-slate-100 text-slate-500 border-slate-200', icon: XCircle },
  updating: { label: 'Updating...', className: 'bg-slate-100 text-slate-500 border-slate-200 opacity-80' },
}

export const priorityConfig: Record<RequestListItem['priority'], PriorityPresentation> = {
  high: { label: 'High', className: 'bg-red-100 text-red-700', icon: Flag },
  medium: { label: 'Medium', className: 'bg-slate-100 text-slate-700', icon: Minus },
  low: { label: 'Low', className: 'bg-slate-100 text-slate-500', icon: ArrowDown },
}
