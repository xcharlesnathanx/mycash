import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils'

interface ExpenseCardProps {
  expenses: number
}

export function ExpenseCard({ expenses }: ExpenseCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 800
    const steps = 60
    const increment = expenses / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, expenses)
      setDisplayValue(Math.floor(current))

      if (step >= steps) {
        setDisplayValue(expenses)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [expenses])

  return (
    <div className="bg-surface-500 border border-neutral-300 rounded-20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-label-medium font-semibold text-neutral-500">Despesas</h3>
        <div className="w-10 h-10 bg-red-600 bg-opacity-10 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15M5 15H12M5 15V8"
              stroke="#e61e32"
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
