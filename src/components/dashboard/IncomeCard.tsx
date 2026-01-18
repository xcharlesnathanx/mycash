import { useEffect, useState } from 'react'
import { ArrowDownLeft } from 'react-feather'
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
          <ArrowDownLeft size={20} className="text-secondary-900" strokeWidth={2} />
        </div>
      </div>
      <p className="text-heading-small font-bold text-secondary-900">{formatCurrency(displayValue)}</p>
    </div>
  )
}
