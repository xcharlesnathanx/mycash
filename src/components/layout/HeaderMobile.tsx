import { Avatar } from '../ui/Avatar'

interface HeaderMobileProps {
  onMenuClick: () => void
}

export function HeaderMobile({ onMenuClick }: HeaderMobileProps) {
  return (
    <header className="fixed top-0 left-0 right-0 lg:hidden w-full bg-surface-500 border-b border-neutral-300 px-4 py-3 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-neutral-300 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#060A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-heading-xsmall text-secondary-900 font-bold">
            mycash+
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-1.5 hover:bg-neutral-300 rounded-lg transition-colors"
            aria-label="Abrir menu do usuário"
          >
            <Avatar name="Lucas Marte" size="sm" />
          </button>
        </div>
      </div>
    </header>
  )
}
