import { Route, Routes } from 'react-router-dom'

import RequestsPage from '@/features/requests/pages/RequestsPage'
import RequestDetailsPage from '@/features/requests/pages/RequestDetailsPage'


export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RequestsPage />} />
      <Route path="/requests/:requestId" element={<RequestDetailsPage />} />
    </Routes>
  )
}
