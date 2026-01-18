import { Menu } from 'react-feather'
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
            <Menu size={24} className="text-secondary-900" strokeWidth={2} />
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
