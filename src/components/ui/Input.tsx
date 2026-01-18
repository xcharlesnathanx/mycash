import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label-small text-secondary-900 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 
          bg-surface-500 
          border border-neutral-300 
          rounded-lg 
          text-paragraph-medium 
          text-secondary-900
          placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${error ? 'border-red-600' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-label-xsmall text-red-600">{error}</p>
      )}
    </div>
  )
}
