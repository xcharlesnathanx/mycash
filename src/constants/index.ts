// Constantes do sistema

/**
 * Rotas da aplicação
 */
export const ROUTES = {
  DASHBOARD: '/',
  CARDS: '/cards',
  TRANSACTIONS: '/transactions',
  GOALS: '/goals',
  PROFILE: '/profile',
} as const

/**
 * Breakpoints de responsividade
 */
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
  DESKTOP: 1280,
} as const

/**
 * Categorias de transação padrão
 */
export const TRANSACTION_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Serviços',
  'Utilidades',
  'Outros',
] as const

/**
 * Status de meta
 */
export const GOAL_STATUSES = ['active', 'completed', 'paused', 'cancelled'] as const

/**
 * Tipos de conta bancária
 */
export const BANK_ACCOUNT_TYPES = ['checking', 'savings', 'investment'] as const

/**
 * Bandeiras de cartão
 */
export const CREDIT_CARD_FLAGS = ['visa', 'mastercard', 'amex', 'elo', 'other'] as const

/**
 * Relacionamentos familiares
 */
export const FAMILY_RELATIONSHIPS = ['owner', 'spouse', 'child', 'parent', 'other'] as const
