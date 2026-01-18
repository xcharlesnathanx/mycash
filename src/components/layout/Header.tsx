import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'

export function Header() {
  return (
    <header className="w-full bg-surface-500 border-b border-neutral-300">
      <div className="w-full max-w-[1400px] lg:max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Bar with icon */}
          <div className="flex-1 min-w-[200px] max-w-sm relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="search"
              placeholder="Q Pesquisar"
              className="w-full pl-10 pr-4 py-2.5 bg-surface-500 border border-neutral-300 rounded-lg text-paragraph-medium text-secondary-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Icon */}
          <button 
            className="p-2.5 border border-neutral-300 rounded-lg text-secondary-900 hover:bg-neutral-300 transition-colors flex-shrink-0"
            aria-label="Filtro"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Date Range Picker */}
          <button className="px-4 py-2.5 border border-neutral-300 rounded-lg text-label-medium text-secondary-900 hover:bg-neutral-300 transition-colors flex items-center gap-2 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6667 1.33333V4M5.33333 1.33333V4M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>01 Jan - 31 Jan 2026</span>
          </button>

          {/* User Avatars */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Avatar name="User 1" size="sm" />
            <Avatar name="User 2" size="sm" />
            <Avatar name="User 3" size="sm" />
            <button 
              className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-secondary-900 hover:bg-neutral-400 transition-colors text-label-medium font-semibold"
              aria-label="Adicionar usuário"
            >
              +
            </button>
          </div>

          {/* New Transaction Button */}
          <Button variant="primary" size="md" className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
            <span className="text-lg leading-none">+</span>
            <span>Nova transação</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
