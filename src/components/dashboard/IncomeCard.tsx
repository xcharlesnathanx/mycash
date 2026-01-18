import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils'

interface IncomeCardProps {
  income: number
}

export function IncomeCard({ income }: IncomeCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 800
    const steps = 60
    const increment = income / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, income)
      setDisplayValue(Math.floor(current))

      if (step >= steps) {
        setDisplayValue(income)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [income])

  return (
    <div className="bg-surface-500 border border-neutral-300 rounded-20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-label-medium font-semibold text-secondary-900">Receitas</h3>
        <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 15L15 5M15 5H8M15 5V12"
              stroke="#060A11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="text-heading-small font-bold text-secondary-900">{formatCurrency(displayValue)}</p>
    </div>
  )
}
