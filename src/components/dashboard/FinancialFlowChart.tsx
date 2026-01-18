import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartDataPoint } from '../../types/chart'
import { formatCurrency } from '../../utils'

interface FinancialFlowChartProps {
  data: ChartDataPoint[]
}

export function FinancialFlowChart({ data }: FinancialFlowChartProps) {
  // Formatação customizada do tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-500 border border-neutral-300 rounded-lg p-3 shadow-lg">
          <p className="text-label-small font-semibold text-secondary-900 mb-2">
            {payload[0].payload.month}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-paragraph-small text-neutral-500">Receitas:</span>
              <span className="text-label-small font-semibold text-green-600">
                {formatCurrency(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-paragraph-small text-neutral-500">Despesas:</span>
              <span className="text-label-small font-semibold text-red-600">
                {formatCurrency(payload[1].value)}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // Formatação do eixo Y (valores monetários)
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `R$${(value / 1000).toFixed(0)}k`
    }
    return `R$${value}`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
      >
        <defs>
          <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#15be78" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#15be78" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e61e32" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e61e32" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatYAxis}
          domain={[0, 'dataMax + 2000']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="receitas"
          stroke="#15be78"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorReceitas)"
        />
        <Area
          type="monotone"
          dataKey="despesas"
          stroke="#e61e32"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDespesas)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
