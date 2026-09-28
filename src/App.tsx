import { AppProviders } from '@/app/providers/AppProviders'
import { AppRouter } from '@/app/router/AppRouter'
import { Toaster } from 'sonner'

function App() {
  return (
    <AppProviders>
      <AppRouter />
      <Toaster />
    </AppProviders>
  )
}

export default App
