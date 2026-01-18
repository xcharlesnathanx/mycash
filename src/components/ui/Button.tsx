import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-secondary-900 text-surface-500 hover:bg-neutral-1100 focus:ring-secondary-900',
    secondary: 'bg-primary-500 text-secondary-900 hover:bg-brand-700 focus:ring-primary-500',
    ghost: 'bg-transparent text-secondary-900 hover:bg-neutral-300 focus:ring-secondary-900',
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-label-small',
    md: 'px-4 py-3 text-label-medium',
    lg: 'px-6 py-4 text-label-large',
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
