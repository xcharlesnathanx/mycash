import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils'

interface BalanceCardProps {
  balance: number
  growthPercentage: number
}

export function BalanceCard({ balance, growthPercentage }: BalanceCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 800
    const steps = 60
    const increment = balance / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, balance)
      setDisplayValue(Math.floor(current))

      if (step >= steps) {
        setDisplayValue(balance)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [balance])

  return (
    <div className="relative bg-secondary-900 rounded-20 p-6 overflow-hidden">
      {/* Círculo verde-limão desfocado decorativo */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-500 rounded-full opacity-20 blur-3xl" />

      {/* Label */}
      <p className="text-label-small text-neutral-400 mb-2 relative z-10">Saldo Total</p>

      {/* Valor */}
      <p className="text-heading-medium font-bold text-surface-500 mb-4 relative z-10">
        {formatCurrency(displayValue)}
      </p>

      {/* Badge de crescimento */}
      <div className="flex items-center gap-2 bg-surface-500 bg-opacity-20 rounded-full px-3 py-1.5 w-fit relative z-10">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 3V13M8 13L12 9M8 13L4 9"
            stroke="#D7FF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-label-xsmall font-semibold text-primary-500">
          +{growthPercentage}% esse mês
        </span>
      </div>
    </div>
  )
}
