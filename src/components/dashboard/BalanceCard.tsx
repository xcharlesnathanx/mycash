import { useEffect, useState } from 'react'
import { TrendingUp } from 'react-feather'
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
    <div className="relative bg-primary-500 rounded-20 p-6 overflow-hidden">
      {/* Círculo verde-limão desfocado decorativo */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-secondary-900 rounded-full opacity-20 blur-3xl" />

      {/* Label */}
      <p className="text-label-small text-secondary-900 mb-2 relative z-10 opacity-70">Saldo Total</p>

      {/* Valor */}
      <p className="text-heading-medium font-bold text-secondary-900 mb-4 relative z-10">
        {formatCurrency(displayValue)}
      </p>

      {/* Badge de crescimento */}
      <div className="flex items-center gap-2 bg-secondary-900 bg-opacity-20 rounded-full px-3 py-1.5 w-fit relative z-10">
        <TrendingUp size={16} className="text-secondary-900" strokeWidth={2} />
        <span className="text-label-xsmall font-semibold text-secondary-900">
          +{growthPercentage}% esse mês
        </span>
      </div>
    </div>
  )
}
