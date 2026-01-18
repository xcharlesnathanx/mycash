import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { FinanceProvider } from './contexts/FinanceContext'
import { router } from './router/routes'

function App() {
  return (
    <AppProvider>
      <FinanceProvider>
        <RouterProvider router={router} />
      </FinanceProvider>
    </AppProvider>
  )
}

export default App
