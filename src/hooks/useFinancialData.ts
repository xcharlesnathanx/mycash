import { useMemo } from 'react'
import { ChartDataPoint, MonthlyFinancialData } from '../types/chart'

/**
 * Hook para gerenciar dados financeiros do gráfico
 * TODO: Substituir por dados reais da API
 */
export function useFinancialData() {
  // Dados mockados baseados no design do Figma
  const monthlyData: MonthlyFinancialData[] = useMemo(
    () => [
      { month: 'JAN', monthNumber: 1, income: 12000, expense: 8000 },
      { month: 'FEV', monthNumber: 2, income: 15000, expense: 9500 },
      { month: 'MAR', monthNumber: 3, income: 13000, expense: 10000 },
      { month: 'ABR', monthNumber: 4, income: 14000, expense: 8500 },
      { month: 'MAI', monthNumber: 5, income: 16000, expense: 11000 },
      { month: 'JUN', monthNumber: 6, income: 14500, expense: 12000 },
      { month: 'JUL', monthNumber: 7, income: 15000, expense: 13000 },
      { month: 'AGO', monthNumber: 8, income: 14000, expense: 12500 },
      { month: 'SET', monthNumber: 9, income: 16000, expense: 10000 },
      { month: 'OUT', monthNumber: 10, income: 17000, expense: 11000 },
      { month: 'NOV', monthNumber: 11, income: 15500, expense: 10500 },
      { month: 'DEZ', monthNumber: 12, income: 17500, expense: 12000 },
    ],
    []
  )

  // Transforma dados para formato do gráfico
  const chartData: ChartDataPoint[] = useMemo(
    () =>
      monthlyData.map((item) => ({
        month: item.month,
        receitas: item.income,
        despesas: item.expense,
      })),
    [monthlyData]
  )

  return {
    monthlyData,
    chartData,
  }
}
