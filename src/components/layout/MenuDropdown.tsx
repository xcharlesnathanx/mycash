import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Repeat, 
  Target, 
  User, 
  X, 
  LogOut 
} from 'react-feather'
import { ROUTES } from '../../constants'

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
  activeRoute?: string
}

// Componente de ícone usando Feather Icons (mesmo da Sidebar)
// Ícone mantém a mesma cor do texto em todos os estados (secondary-900)
function NavIcon({ icon }: { icon: string }) {
  const iconColorClass = 'text-secondary-900'
  const iconSize = 20
  
  const icons: Record<string, JSX.Element> = {
    dashboard: <Home size={iconSize} className={iconColorClass} strokeWidth={1.5} />,
    cards: <CreditCard size={iconSize} className={iconColorClass} strokeWidth={1.5} />,
    transactions: <Repeat size={iconSize} className={iconColorClass} strokeWidth={1.5} />,
    goals: <Target size={iconSize} className={iconColorClass} strokeWidth={1.5} />,
    profile: <User size={iconSize} className={iconColorClass} strokeWidth={1.5} />,
  }
  
  return icons[icon] || icons.dashboard
}

export function MenuDropdown({ isOpen, onClose, activeRoute }: MenuDropdownProps) {
  const location = useLocation()

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard', path: ROUTES.DASHBOARD },
    { id: 'cards', label: 'Cartões', icon: 'cards', path: ROUTES.CARDS },
    { id: 'transactions', label: 'Transações', icon: 'transactions', path: ROUTES.TRANSACTIONS },
    { id: 'goals', label: 'Metas', icon: 'goals', path: ROUTES.GOALS },
    { id: 'profile', label: 'Perfil', icon: 'profile', path: ROUTES.PROFILE },
  ]

  const currentRoute = activeRoute || navItems.find(item => location.pathname === item.path)?.id || 'dashboard'

  return (
    <>
      {/* Overlay escuro semi-transparente */}
      <div
        className={`
          fixed inset-0 bg-secondary-900 bg-opacity-50 z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Menu Dropdown que desliza de cima para baixo */}
      <div
        className={`
          fixed top-0 left-0 right-0
          bg-surface-500
          border-b border-neutral-300
          shadow-lg
          z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do menu */}
        <div className="px-4 py-3 border-b border-neutral-300 flex items-center justify-between">
          <h2 className="text-heading-small text-secondary-900 font-bold">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-300 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} className="text-secondary-900" strokeWidth={2} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3
                      px-4 py-3
                      rounded-20
                      transition-all duration-200 ease-in-out
                      ${
                        isActive
                          ? 'bg-primary-500 text-secondary-900'
                          : 'text-secondary-900 hover:bg-neutral-300'
                      }
                    `}
                  >
                    <NavIcon icon={item.icon} />
                    <span className={`text-label-medium font-semibold ${isActive ? 'text-secondary-900' : 'text-secondary-900'}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Botão Sair */}
        <div className="px-4 py-4 border-t border-neutral-300">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-surface-500 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} className="text-surface-500" strokeWidth={1.5} />
            <span className="text-label-medium font-semibold">Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}
