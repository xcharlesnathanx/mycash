import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Repeat, 
  Target, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'react-feather'
import { useSidebar } from '../../hooks/useSidebar'
import { Avatar } from '../ui/Avatar'
import { Tooltip } from '../ui/Tooltip'
import { ROUTES } from '../../constants'

interface SidebarProps {
  activeRoute?: string
}

// Componente de ícone usando Feather Icons
// Usando variáveis do design system conforme Figma:
// - Ícone mantém a mesma cor do texto em todos os estados (secondary-900)
function NavIcon({ icon }: { icon: string }) {
  // Usar classes Tailwind com variáveis do design system
  // Ícone sempre usa a mesma cor do texto (secondary-900) em default, hover e ativo
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
        <div className="px-6 py-6 border-b border-neutral-300 flex items-center justify-between">
          {isExpanded ? (
            <h1 className="text-heading-small text-secondary-900 font-bold">
              mycash+
            </h1>
          ) : (
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-label-small font-bold text-secondary-900">m</span>
            </div>
          )}
          {/* Botão de colapsar no header (conforme Figma) */}
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-300 transition-colors duration-200"
            aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
          >
            {isExpanded ? (
              <ChevronLeft size={20} className="text-secondary-900" strokeWidth={2} />
            ) : (
              <ChevronRight size={20} className="text-secondary-900" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id
              const navItem = (
                <Link
                  to={item.path}
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
                  {isExpanded && (
                    <span className={`text-label-medium font-semibold ${isActive ? 'text-secondary-900' : 'text-secondary-900'}`}>
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
        <div className="px-4 py-4 border-t border-neutral-300">
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
    </aside>
  )
}
