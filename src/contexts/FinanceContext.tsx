import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
  TransactionType,
} from '../types'

// Interface do contexto
interface FinanceContextType {
  // Arrays de entidades
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]

  // Funções CRUD - Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // Funções CRUD - Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // Funções CRUD - CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCreditCard: (id: string, card: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // Funções CRUD - BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBankAccount: (id: string, account: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // Funções CRUD - FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Estados de filtros globais
  selectedMember: string | null
  setSelectedMember: (memberId: string | null) => void
  dateRange: { startDate: string | null; endDate: string | null }
  setDateRange: (range: { startDate: string | null; endDate: string | null }) => void
  transactionType: 'all' | TransactionType
  setTransactionType: (type: 'all' | TransactionType) => void
  searchText: string
  setSearchText: (text: string) => void

  // Funções de cálculo derivadas
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; value: number }>
  calculateCategoryPercentage: (category: string) => number
  calculateSavingsRate: () => number
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Função auxiliar para gerar ID único
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Função auxiliar para obter data atual em ISO
function getCurrentDate(): string {
  return new Date().toISOString()
}

// Dados mock iniciais realistas
function getInitialMockData() {
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1)

  // Membros da família
  const members: FamilyMember[] = [
    {
      id: 'member-1',
      name: 'Lucas Marte',
      email: 'lucasmarte@gmail.com',
      avatar: undefined,
      relationship: 'owner',
      isOwner: true,
      permissions: {
        canViewTransactions: true,
        canCreateTransactions: true,
        canEditTransactions: true,
        canDeleteTransactions: true,
        canManageGoals: true,
        canManageAccounts: true,
      },
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
    {
      id: 'member-2',
      name: 'Maria Silva',
      email: 'mariasilva@gmail.com',
      avatar: undefined,
      relationship: 'spouse',
      isOwner: false,
      permissions: {
        canViewTransactions: true,
        canCreateTransactions: true,
        canEditTransactions: true,
        canDeleteTransactions: false,
        canManageGoals: true,
        canManageAccounts: false,
      },
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
    {
      id: 'member-3',
      name: 'João Marte',
      email: 'joaomarte@gmail.com',
      avatar: undefined,
      relationship: 'child',
      isOwner: false,
      permissions: {
        canViewTransactions: true,
        canCreateTransactions: false,
        canEditTransactions: false,
        canDeleteTransactions: false,
        canManageGoals: false,
        canManageAccounts: false,
      },
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
  ]

  // Contas bancárias
  const accounts: BankAccount[] = [
    {
      id: 'account-1',
      name: 'Conta Corrente Nubank',
      bank: 'Nubank',
      type: 'checking',
      accountNumber: '12345-6',
      agency: undefined,
      balance: 5000,
      memberId: 'member-1',
      isActive: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
    {
      id: 'account-2',
      name: 'Conta Poupança Inter',
      bank: 'Inter',
      type: 'savings',
      accountNumber: '78901-2',
      agency: undefined,
      balance: 15000,
      memberId: 'member-1',
      isActive: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
  ]

  // Cartões de crédito
  const cards: CreditCard[] = [
    {
      id: 'card-1',
      name: 'Nubank Mastercard',
      flag: 'mastercard',
      lastDigits: '5897',
      dueDate: 15,
      limit: 10000,
      currentBalance: 3500,
      availableLimit: 6500,
      closingDate: 5,
      memberId: 'member-1',
      isActive: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
    {
      id: 'card-2',
      name: 'Inter Visa',
      flag: 'visa',
      lastDigits: '1234',
      dueDate: 20,
      limit: 5000,
      currentBalance: 1200,
      availableLimit: 3800,
      closingDate: 10,
      memberId: 'member-2',
      isActive: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
  ]

  // Transações mock (20-30 transações distribuídas nos últimos 3 meses)
  const transactions: Transaction[] = []
  const categories = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Serviços']
  const incomeCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros']

  // Receitas
  for (let i = 0; i < 8; i++) {
    const date = new Date(threeMonthsAgo)
    date.setDate(date.getDate() + Math.floor(Math.random() * 90))
    transactions.push({
      id: `transaction-${i + 1}`,
      description: incomeCategories[Math.floor(Math.random() * incomeCategories.length)],
      type: 'income',
      value: Math.floor(Math.random() * 5000) + 2000,
      date: date.toISOString(),
      category: incomeCategories[Math.floor(Math.random() * incomeCategories.length)],
      accountId: accounts[Math.floor(Math.random() * accounts.length)].id,
      memberId: members[Math.floor(Math.random() * members.length)].id,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    })
  }

  // Despesas
  for (let i = 0; i < 22; i++) {
    const date = new Date(threeMonthsAgo)
    date.setDate(date.getDate() + Math.floor(Math.random() * 90))
    const isCard = Math.random() > 0.5
    transactions.push({
      id: `transaction-${i + 9}`,
      description: `Compra ${i + 1}`,
      type: 'expense',
      value: Math.floor(Math.random() * 1000) + 50,
      date: date.toISOString(),
      category: categories[Math.floor(Math.random() * categories.length)],
      accountId: isCard ? cards[Math.floor(Math.random() * cards.length)].id : accounts[0].id,
      creditCardId: isCard ? cards[Math.floor(Math.random() * cards.length)].id : undefined,
      memberId: members[Math.floor(Math.random() * members.length)].id,
      installments: Math.random() > 0.7 ? { current: 1, total: Math.floor(Math.random() * 6) + 2 } : undefined,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    })
  }

  // Metas
  const goals: Goal[] = [
    {
      id: 'goal-1',
      title: 'Viagem para Europa',
      description: 'Economizar para viagem de 15 dias',
      targetAmount: 30000,
      currentAmount: 12000,
      deadline: new Date(now.getFullYear() + 1, 5, 1).toISOString(),
      status: 'active',
      category: 'Viagem',
      memberId: 'member-1',
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
    {
      id: 'goal-2',
      title: 'Reserva de Emergência',
      description: '6 meses de despesas',
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: new Date(now.getFullYear() + 1, 11, 31).toISOString(),
      status: 'active',
      category: 'Reserva',
      memberId: 'member-1',
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    },
  ]

  return { members, accounts, cards, transactions, goals }
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const initialData = useMemo(() => getInitialMockData(), [])

  // Estados das entidades
  const [transactions, setTransactions] = useState<Transaction[]>(initialData.transactions)
  const [goals, setGoals] = useState<Goal[]>(initialData.goals)
  const [creditCards, setCreditCards] = useState<CreditCard[]>(initialData.cards)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialData.accounts)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialData.members)

  // Estados de filtros globais
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null,
  })
  const [transactionType, setTransactionType] = useState<'all' | TransactionType>('all')
  const [searchText, setSearchText] = useState<string>('')

  // Funções CRUD - Transactions
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...transaction, updatedAt: getCurrentDate() } : t))
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // Funções CRUD - Goals
  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: generateId(),
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateGoal = (id: string, goal: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...goal, updatedAt: getCurrentDate() } : g))
    )
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  // Funções CRUD - CreditCards
  const addCreditCard = (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard: CreditCard = {
      ...card,
      id: generateId(),
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    }
    setCreditCards((prev) => [...prev, newCard])
  }

  const updateCreditCard = (id: string, card: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...card, updatedAt: getCurrentDate() } : c))
    )
  }

  const deleteCreditCard = (id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id))
  }

  // Funções CRUD - BankAccounts
  const addBankAccount = (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: BankAccount = {
      ...account,
      id: generateId(),
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    }
    setBankAccounts((prev) => [...prev, newAccount])
  }

  const updateBankAccount = (id: string, account: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...account, updatedAt: getCurrentDate() } : a))
    )
  }

  const deleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id))
  }

  // Funções CRUD - FamilyMembers
  const addFamilyMember = (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: generateId(),
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    }
    setFamilyMembers((prev) => [...prev, newMember])
  }

  const updateFamilyMember = (id: string, member: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...member, updatedAt: getCurrentDate() } : m))
    )
  }

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id))
  }

  // Funções de cálculo derivadas
  const getFilteredTransactions = useMemo(() => {
    let filtered = [...transactions]

    // Filtro por membro
    if (selectedMember) {
      filtered = filtered.filter((t) => t.memberId === selectedMember)
    }

    // Filtro por tipo
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType)
    }

    // Filtro por período
    if (dateRange.startDate) {
      filtered = filtered.filter((t) => t.date >= dateRange.startDate!)
    }
    if (dateRange.endDate) {
      filtered = filtered.filter((t) => t.date <= dateRange.endDate!)
    }

    // Filtro por busca textual
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [transactions, selectedMember, transactionType, dateRange, searchText])

  const calculateTotalBalance = useMemo(() => {
    const accountsBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBalance, 0)
    return accountsBalance - cardsDebt
  }, [bankAccounts, creditCards])

  const calculateIncomeForPeriod = useMemo(() => {
    return getFilteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0)
  }, [getFilteredTransactions])

  const calculateExpensesForPeriod = useMemo(() => {
    return getFilteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0)
  }, [getFilteredTransactions])

  const calculateExpensesByCategory = useMemo(() => {
    const expenses = getFilteredTransactions.filter((t) => t.type === 'expense')
    const grouped = expenses.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.value
        return acc
      },
      {} as Record<string, number>
    )
    return Object.entries(grouped)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
  }, [getFilteredTransactions])

  const calculateCategoryPercentage = (category: string) => {
    const totalIncome = calculateIncomeForPeriod
    if (totalIncome === 0) return 0
    const categoryExpenses = calculateExpensesByCategory.find((c) => c.category === category)
    if (!categoryExpenses) return 0
    return (categoryExpenses.value / totalIncome) * 100
  }

  const calculateSavingsRate = useMemo(() => {
    if (calculateIncomeForPeriod === 0) return 0
    return ((calculateIncomeForPeriod - calculateExpensesForPeriod) / calculateIncomeForPeriod) * 100
  }, [calculateIncomeForPeriod, calculateExpensesForPeriod])

  const value: FinanceContextType = {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    selectedMember,
    setSelectedMember,
    dateRange,
    setDateRange,
    transactionType,
    setTransactionType,
    searchText,
    setSearchText,
    getFilteredTransactions: () => getFilteredTransactions,
    calculateTotalBalance: () => calculateTotalBalance,
    calculateIncomeForPeriod: () => calculateIncomeForPeriod,
    calculateExpensesForPeriod: () => calculateExpensesForPeriod,
    calculateExpensesByCategory: () => calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate: () => calculateSavingsRate,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}
