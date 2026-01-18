import { Search, Sliders, Calendar, Plus } from 'react-feather'

export function Header() {
  return (
    <header className="w-full bg-surface-500 border-b border-neutral-300">
      <div className="w-full max-w-[1400px] lg:max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Seção Esquerda: Busca, Separador, Filtro e Datepicker */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Bar with icon - formato pill conforme Figma */}
            <div className="flex-1 min-w-[200px] max-w-sm relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <Search size={16} className="text-secondary-900" strokeWidth={1.5} />
              </div>
            <input
              type="search"
              placeholder="Pesquisar"
              className="w-full pl-10 pr-4 py-2.5 bg-surface-500 border border-neutral-300 rounded-full text-paragraph-small text-secondary-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Icon - formato pill conforme Figma */}
            <button 
              className="p-2.5 border border-neutral-300 rounded-full bg-surface-500 text-secondary-900 hover:bg-neutral-300 transition-colors flex-shrink-0"
              aria-label="Filtro"
            >
              <Sliders size={16} className="text-secondary-900" strokeWidth={1.5} />
            </button>

            {/* Date Range Picker - formato pill conforme Figma */}
            <button className="px-4 py-2.5 border border-neutral-300 rounded-full bg-surface-500 text-label-medium text-secondary-900 hover:bg-neutral-300 transition-colors flex items-center gap-2 flex-shrink-0">
              <Calendar size={16} className="text-secondary-900" strokeWidth={1.5} />
              <span>01 Jan - 31 Jan 2026</span>
            </button>
          </div>

          {/* Seção Direita: Botão Nova Transação */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* New Transaction Button - fundo escuro, formato pill, alinhado à direita conforme Figma */}
            <button className="px-4 py-2.5 bg-secondary-900 text-surface-500 rounded-full hover:bg-neutral-1100 transition-colors flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
              <Plus size={18} className="text-surface-500" strokeWidth={2} />
              <span className="text-label-medium font-semibold">Nova transação</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
