import { createContext, useContext, ReactNode } from 'react'
import { FamilyMember } from '../types'

interface AppContextType {
  currentUser: FamilyMember | null
  setCurrentUser: (user: FamilyMember | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // TODO: Implementar lógica de autenticação e estado do usuário
  const currentUser: FamilyMember | null = null
  const setCurrentUser = () => {
    // TODO: Implementar
  }

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
