import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants'

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
  activeRoute?: string
}

// Componente de ícone SVG para navegação (mesmo da Sidebar)
function NavIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const iconColor = isActive ? '#D7FF00' : '#060A11'
  
  const icons: Record<string, JSX.Element> = {
    dashboard: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10L10 3L17 10M3 17H7V12H13V17H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cards: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="16" height="10" rx="2" stroke={iconColor} strokeWidth="1.5"/>
        <path d="M2 9H18" stroke={iconColor} strokeWidth="1.5"/>
        <circle cx="15" cy="12" r="1" fill={iconColor}/>
      </svg>
    ),
    transactions: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10H17M3 10L7 6M3 10L7 14M17 10L13 6M17 10L13 14" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    goals: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7" stroke={iconColor} strokeWidth="1.5"/>
        <path d="M10 6V10L13 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    profile: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="7" r="3" stroke={iconColor} strokeWidth="1.5"/>
        <path d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#060A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
                      rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-secondary-900 text-surface-500'
                          : 'text-secondary-900 hover:bg-neutral-300'
                      }
                    `}
                  >
                    <NavIcon icon={item.icon} isActive={isActive} />
                    <span className={`text-label-medium font-semibold ${isActive ? 'text-surface-500' : 'text-secondary-900'}`}>
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6L17 10M17 10L13 14M17 10H7M7 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-label-medium font-semibold">Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}
