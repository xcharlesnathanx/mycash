import { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { HeaderMobile } from './HeaderMobile'
import { MenuDropdown } from './MenuDropdown'
import { useSidebar } from '../../hooks/useSidebar'

interface MainLayoutProps {
  children: ReactNode
  activeRoute?: string
}

export function MainLayout({ children, activeRoute }: MainLayoutProps) {
  const { isMobile, isExpanded } = useSidebar()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-background-400">
      {/* Sidebar - apenas desktop (≥1280px) */}
      {!isMobile && <Sidebar activeRoute={activeRoute} />}

      {/* Main Content Area */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${!isMobile ? (isExpanded ? 'lg:ml-64' : 'lg:ml-20') : ''}
        `}
      >
        {/* Header Mobile - apenas mobile/tablet (<1280px) */}
        {isMobile && (
          <>
            <HeaderMobile onMenuClick={() => setIsMobileMenuOpen(true)} />
            {/* Espaçamento para compensar header fixo */}
            <div className="h-16" />
          </>
        )}

        {/* Header Desktop - apenas desktop (≥1280px) */}
        {!isMobile && <Header />}

        {/* Main Content */}
        <main className="w-full px-4 md:px-6 lg:px-8 py-6">
          <div className="w-full max-w-[1400px] lg:max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Menu Dropdown - apenas mobile/tablet */}
      {isMobile && (
        <MenuDropdown
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeRoute={activeRoute}
        />
      )}
    </div>
  )
}
