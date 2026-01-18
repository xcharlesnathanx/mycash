import { useMemo } from 'react'
import { 
  Home, 
  Coffee, 
  ShoppingCart, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  ArrowUpRight,
  ArrowRight,
  CreditCard
} from 'react-feather'
import { Card } from '../components/ui/Card'
import { CircularProgress } from '../components/ui/CircularProgress'
import { BalanceCard } from '../components/dashboard/BalanceCard'
import { IncomeCard } from '../components/dashboard/IncomeCard'
import { ExpenseCard } from '../components/dashboard/ExpenseCard'
import { useFinance } from '../contexts/FinanceContext'

export function DashboardPage() {
  const {
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    transactions,
  } = useFinance()

  const totalBalance = calculateTotalBalance()
  const income = calculateIncomeForPeriod()
  const expenses = calculateExpensesForPeriod()

  // Calcular crescimento percentual comparando com mês anterior
  const growthPercentage = useMemo(() => {
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    const currentMonthBalance = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= currentMonthStart && t.type === 'income'
      })
      .reduce((sum, t) => sum + t.value, 0)

    const lastMonthBalance = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= lastMonthStart && tDate <= lastMonthEnd && t.type === 'income'
      })
      .reduce((sum, t) => sum + t.value, 0)

    if (lastMonthBalance === 0) return 0
    return Math.round(((currentMonthBalance - lastMonthBalance) / lastMonthBalance) * 100)
  }, [transactions])

  return (
    <div className="w-full space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard balance={totalBalance} growthPercentage={growthPercentage} />
        <IncomeCard income={income} />
        <ExpenseCard expenses={expenses} />
      </div>

      {/* Category Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Aluguel', percentage: 25, value: 4000 },
          { name: 'Alimentação', percentage: 15, value: 2000 },
          { name: 'Mercado', percentage: 5, value: 1500 },
          { name: 'Academia', percentage: 3, value: 120 },
        ].map((category, index) => {
          const iconComponents = [
            <Home key="home" size={24} className="text-secondary-900" strokeWidth={1.5} />,
            <Coffee key="coffee" size={24} className="text-secondary-900" strokeWidth={1.5} />,
            <ShoppingCart key="cart" size={24} className="text-secondary-900" strokeWidth={1.5} />,
            <Activity key="activity" size={24} className="text-secondary-900" strokeWidth={1.5} />,
          ]
          return (
            <Card key={category.name} padding="sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-10 h-10">
                  {iconComponents[index] || iconComponents[0]}
                </div>
                <CircularProgress percentage={category.percentage} size={48} />
              </div>
              <h3 className="text-label-medium font-semibold text-secondary-900 mb-1">
                {category.name}
              </h3>
              <p className="text-paragraph-small text-neutral-500">
                R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Cards & Accounts Section */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-small text-secondary-900 font-bold">
            Cards & contas
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-300 rounded-lg transition-colors" aria-label="Anterior">
              <ChevronLeft size={16} className="text-secondary-900" strokeWidth={2} />
            </button>
            <button className="p-2 hover:bg-neutral-300 rounded-lg transition-colors" aria-label="Próximo">
              <ChevronRight size={16} className="text-secondary-900" strokeWidth={2} />
            </button>
            <button className="p-2 hover:bg-neutral-300 rounded-lg transition-colors" aria-label="Adicionar">
              <Plus size={16} className="text-secondary-900" strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Nubank', balance: 120, dueDate: 10, lastDigits: '5897' },
            { name: 'Inter', balance: 2300, dueDate: 21, lastDigits: '5897' },
            { name: 'Picpay', balance: 17000, dueDate: 12, lastDigits: '5897' },
          ].map((card) => (
            <div
              key={card.name}
              className="flex items-center justify-between p-4 bg-background-400 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                  <CreditCard size={20} className="text-secondary-900" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-label-medium font-semibold text-secondary-900">
                    {card.name}
                  </p>
                  <p className="text-paragraph-xsmall text-neutral-500">
                    Vence dia {card.dueDate} • ****{card.lastDigits}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-label-medium font-semibold text-secondary-900">
                  R$ {card.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <ArrowRight size={16} className="text-secondary-900" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Financial Flow Chart Placeholder */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-small text-secondary-900 font-bold">
            Fluxo financeiro
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-label-xsmall text-neutral-500">Receitas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-label-xsmall text-neutral-500">Despesas</span>
            </div>
          </div>
        </div>
        <div className="h-64 bg-background-400 rounded-lg flex items-center justify-center">
          <p className="text-paragraph-medium text-neutral-500">
            Gráfico será implementado aqui
          </p>
        </div>
      </Card>

      {/* Upcoming Expenses */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-small text-secondary-900 font-bold">
            Próximas despesas
          </h2>
          <button className="p-2 hover:bg-neutral-300 rounded-lg">+</button>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 bg-background-400 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-green-600 flex items-center justify-center">
                  <Check size={12} className="text-green-600" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-label-medium font-semibold text-secondary-900">
                    Conta de Luz
                  </p>
                  <p className="text-paragraph-xsmall text-neutral-500">
                    Vence dia 21/01 • Crédito Nubank ****5897
                  </p>
                </div>
              </div>
              <p className="text-label-medium font-semibold text-secondary-900">
                R$ 154,00
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Statement */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-heading-small text-secondary-900 font-bold">
            Extrato detalhado
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="search"
              placeholder="Q Buscar lançamentos"
              className="px-4 py-2 border border-neutral-300 rounded-lg text-paragraph-small"
            />
            <select className="px-4 py-2 border border-neutral-300 rounded-lg text-paragraph-small">
              <option>Despesas</option>
              <option>Receitas</option>
              <option>Todas</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Membro
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Datas
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Descrição
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Categorias
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Conta/cartão
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Parcelas
                </th>
                <th className="text-left py-3 px-4 text-label-small font-semibold text-secondary-900">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { member: 'Lucas', date: '17/01/2026', description: 'Conta de água', category: 'Manutenção', account: 'Conta corrente', installments: '-', value: 100 },
                { member: 'Lucas', date: '17/01/2026', description: 'Conta de Luz', category: 'Manutenção', account: 'Conta corrente', installments: '-', value: 150 },
                { member: 'Lucas', date: '17/01/2026', description: 'Passeio no parque', category: 'Lazer', account: 'Cartão XP', installments: '1/1', value: 750 },
              ].map((transaction, index) => (
                <tr key={index} className="border-b border-neutral-300">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-label-xsmall font-semibold">
                        {transaction.member[0]}
                      </div>
                      <span className="text-paragraph-small text-secondary-900">
                        {transaction.member}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-paragraph-small text-secondary-900">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight size={16} className="text-red-600" strokeWidth={2} />
                      <span className="text-paragraph-small text-secondary-900">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-paragraph-small text-secondary-900">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-paragraph-small text-secondary-900">
                    {transaction.account}
                  </td>
                  <td className="py-3 px-4 text-paragraph-small text-neutral-500">
                    {transaction.installments}
                  </td>
                  <td className="py-3 px-4 text-label-medium font-semibold text-secondary-900">
                    R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-300">
          <p className="text-paragraph-xsmall text-neutral-500">
            Mostrando 1 a 5 de 17
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-neutral-300 rounded-lg text-paragraph-small hover:bg-neutral-300 transition-colors flex items-center justify-center" aria-label="Página anterior">
              <ChevronLeft size={16} className="text-secondary-900" strokeWidth={2} />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 border rounded-lg text-paragraph-small transition-colors ${
                  page === 1
                    ? 'bg-primary-500 border-primary-500 text-secondary-900'
                    : 'border-neutral-300 hover:bg-neutral-300 text-secondary-900'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border border-neutral-300 rounded-lg text-paragraph-small hover:bg-neutral-300 transition-colors flex items-center justify-center" aria-label="Próxima página">
              <ChevronRight size={16} className="text-secondary-900" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
