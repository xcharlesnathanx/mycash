// Tipos fundamentais do sistema MyCash+

/**
 * Tipo de transação
 */
export type TransactionType = 'income' | 'expense'

/**
 * Status de uma meta
 */
export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled'

/**
 * Tipo de conta bancária
 */
export type BankAccountType = 'checking' | 'savings' | 'investment'

/**
 * Bandeira de cartão de crédito
 */
export type CreditCardFlag = 'visa' | 'mastercard' | 'amex' | 'elo' | 'other'

/**
 * Relacionamento familiar
 */
export type FamilyRelationship = 'owner' | 'spouse' | 'child' | 'parent' | 'other'

/**
 * Transaction - Representa uma transação financeira
 */
export interface Transaction {
  id: string
  description: string
  type: TransactionType
  value: number
  date: string // ISO 8601 format
  category: string
  accountId: string // ID da conta bancária ou cartão
  creditCardId?: string // ID do cartão de crédito (se aplicável)
  memberId: string // ID do membro da família que fez a transação
  installments?: {
    current: number
    total: number
  }
  notes?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

/**
 * Goal - Representa uma meta financeira
 */
export interface Goal {
  id: string
  title: string
  description?: string
  targetAmount: number
  currentAmount: number
  deadline: string // ISO 8601 format
  status: GoalStatus
  category?: string
  memberId: string // ID do membro responsável pela meta
  createdAt: string
  updatedAt: string
}

/**
 * CreditCard - Representa um cartão de crédito
 */
export interface CreditCard {
  id: string
  name: string // Ex: "Nubank", "Inter"
  flag: CreditCardFlag
  lastDigits: string // Últimos 4 dígitos
  dueDate: number // Dia do vencimento (1-31)
  limit: number
  currentBalance: number
  availableLimit: number
  closingDate?: number // Dia de fechamento da fatura (1-31)
  memberId: string // ID do membro dono do cartão
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * BankAccount - Representa uma conta bancária
 */
export interface BankAccount {
  id: string
  name: string // Ex: "Conta Corrente Nubank"
  bank: string // Nome do banco
  type: BankAccountType
  accountNumber: string
  agency?: string
  balance: number
  memberId: string // ID do membro dono da conta
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * FamilyMember - Representa um membro da família
 */
export interface FamilyMember {
  id: string
  name: string
  email: string
  avatar?: string
  relationship: FamilyRelationship
  isOwner: boolean // Se é o dono principal da conta
  permissions: {
    canViewTransactions: boolean
    canCreateTransactions: boolean
    canEditTransactions: boolean
    canDeleteTransactions: boolean
    canManageGoals: boolean
    canManageAccounts: boolean
  }
  createdAt: string
  updatedAt: string
}

// Tipos auxiliares para filtros e queries
export interface TransactionFilters {
  type?: TransactionType
  category?: string
  accountId?: string
  memberId?: string
  dateFrom?: string
  dateTo?: string
  minValue?: number
  maxValue?: number
}

export interface GoalFilters {
  status?: GoalStatus
  memberId?: string
  category?: string
}
