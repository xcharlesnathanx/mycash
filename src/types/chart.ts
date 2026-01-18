// Tipos para gráficos

/**
 * Dados mensais para o gráfico de fluxo financeiro
 */
export interface MonthlyFinancialData {
  month: string // Nome do mês (JAN, FEV, MAR, etc.)
  monthNumber: number // Número do mês (1-12)
  income: number // Receitas do mês
  expense: number // Despesas do mês
}

/**
 * Dados formatados para o Recharts
 */
export interface ChartDataPoint {
  month: string
  receitas: number
  despesas: number
}
