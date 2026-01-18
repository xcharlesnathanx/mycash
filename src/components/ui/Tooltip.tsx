import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  position?: 'right' | 'left' | 'top' | 'bottom'
}

export function Tooltip({ children, content, position = 'right' }: TooltipProps) {
  const positionClasses = {
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  }

  return (
    <div className="relative group">
      {children}
      <div
        className={`
          absolute z-50
          ${positionClasses[position]}
          px-3 py-2
          bg-secondary-900
          text-surface-500
          text-label-xsmall
          rounded-lg
          whitespace-nowrap
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-200 delay-300
          pointer-events-none
          shadow-lg
        `}
      >
        {content}
        {/* Seta do tooltip */}
        <div
          className={`
            absolute
            ${
              position === 'right'
                ? 'right-full top-1/2 -translate-y-1/2 border-r-4 border-r-secondary-900 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                : position === 'left'
                ? 'left-full top-1/2 -translate-y-1/2 border-l-4 border-l-secondary-900 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                : position === 'top'
                ? 'bottom-full left-1/2 -translate-x-1/2 border-t-4 border-t-secondary-900 border-l-4 border-l-transparent border-r-4 border-r-transparent'
                : 'top-full left-1/2 -translate-x-1/2 border-b-4 border-b-secondary-900 border-l-4 border-l-transparent border-r-4 border-r-transparent'
            }
          `}
        />
      </div>
    </div>
  )
}
