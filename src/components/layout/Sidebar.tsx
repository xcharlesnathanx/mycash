import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../../hooks/useSidebar'
import { Avatar } from '../ui/Avatar'
import { Tooltip } from '../ui/Tooltip'
import { ROUTES } from '../../constants'

interface SidebarProps {
  activeRoute?: string
}

// Componente de ícone SVG para navegação
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

export function Sidebar({ activeRoute }: SidebarProps) {
  const { isExpanded, isMobile, toggle } = useSidebar()
  const location = useLocation()

  // Não renderiza no mobile/tablet
  if (isMobile) {
    return null
  }

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
      <aside
        className={`
          fixed left-0 top-0 h-full
          bg-surface-500
          border-r border-neutral-300
          transition-all duration-300 ease-in-out
          z-40
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Header */}
          <div className="p-6 border-b border-neutral-300 flex items-center gap-3">
            {isExpanded ? (
              <h1 className="text-heading-small text-secondary-900 font-bold">
                mycash+
              </h1>
            ) : (
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-label-small font-bold text-secondary-900">m</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = currentRoute === item.id
                const navItem = (
                  <Link
                    to={item.path}
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
                    {isExpanded && (
                      <span className={`text-label-medium font-semibold ${isActive ? 'text-surface-500' : 'text-secondary-900'}`}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                )

                // Envolver com tooltip apenas quando colapsada
                if (!isExpanded) {
                  return (
                    <li key={item.id}>
                      <Tooltip content={item.label} position="right">
                        {navItem}
                      </Tooltip>
                    </li>
                  )
                }

                return <li key={item.id}>{navItem}</li>
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-300">
            {isExpanded ? (
              <div className="flex items-center gap-3">
                <Avatar name="Lucas Marte" size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-label-small font-semibold text-secondary-900 truncate">
                    Lucas Marte
                  </p>
                  <p className="text-paragraph-xsmall text-neutral-500 truncate">
                    lucasmarte@gmail.com
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Tooltip content="Lucas Marte" position="right">
                  <Avatar name="Lucas Marte" size="md" />
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        {/* Botão de alternância circular na borda direita */}
        <button
          onClick={toggle}
          className={`
            absolute top-1/2 -translate-y-1/2
            right-0 translate-x-1/2
            w-8 h-8
            bg-surface-500
            border-2 border-neutral-300
            rounded-full
            flex items-center justify-center
            shadow-md
            hover:bg-neutral-300
            transition-all duration-200
            z-50
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
          aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
        >
          {isExpanded ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="#060A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="#060A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </aside>
    </>
  )
}
