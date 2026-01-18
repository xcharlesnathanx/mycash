import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  return (
    <div
      className={`bg-surface-500 rounded-20 shadow-sm ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
