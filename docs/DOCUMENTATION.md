# 🎯 Sequência de Prompts para Construção do mycash+

## 📋 Lista Completa dos 24 Prompts

### ✅ PROMPT 0: Análise e Planejamento Inicial
**Status:** ✅ CONCLUÍDO

Análise completa do projeto via Figma MCP:
- Identificar componentes visuais das telas Dashboard, Cartões, Transações e Perfil
- Mapear hierarquia visual e relação entre componentes
- Identificar todas as variables semânticas e primitivas do design system
- Analisar estrutura de navegação (sidebar desktop expandida/colapsada, header mobile)
- Apresentar resumo da arquitetura proposta

---

### ✅ PROMPT 1: Estrutura Base e Configuração
**Status:** ✅ CONCLUÍDO

- Configurar estrutura de pastas (components, contexts, hooks, types, utils, constants)
- Organizar componentes por domínio (layout, dashboard, cards, modals)
- Configurar Tailwind CSS com variáveis do Figma
- Criar tipos TypeScript para 5 entidades: Transaction, Goal, CreditCard, BankAccount, FamilyMember
- Configurar React Router com 5 rotas principais
- Requisitos de responsividade: Desktop (≥1024px), Tablet (641-1023px), Mobile (≤640px)

---

### ✅ PROMPT 2: Sistema de Layout e Navegação Desktop
**Status:** ✅ CONCLUÍDO

- ✅ Componente Sidebar com estados expandido/colapsado implementado
- ✅ Botão de alternância circular na borda direita com transições suaves
- ✅ Sistema de tooltip para sidebar colapsada (componente Tooltip criado)
- ✅ Item ativo com fundo preto (secondary-900) e texto branco (surface-500), ícone verde-limão (primary-500)
- ✅ Ícones SVG ao invés de emojis
- ✅ Transições suaves (duration-300 ease-in-out) em sidebar e conteúdo principal
- ✅ Logo completo "mycash+" quando expandida, apenas ícone quando colapsada
- ✅ Usando exclusivamente variables do design system

---

### ✅ PROMPT 3: Sistema de Layout e Navegação Mobile
**Status:** ✅ CONCLUÍDO

- ✅ HeaderMobile fixo no topo implementado (position: fixed, z-index: 30)
- ✅ MenuDropdown criado com animação slide-down (desliza de cima para baixo)
- ✅ Lógica de fechamento implementada: clique fora (overlay), botão X, item de navegação
- ✅ Breakpoints garantidos: sidebar apenas desktop (≥1280px), header apenas mobile/tablet (<1280px)
- ✅ Item ativo com fundo preto e ícone verde-limão
- ✅ Botão "Sair" vermelho na parte inferior do menu
- ✅ Espaçamento compensatório para header fixo no mobile
- ✅ Usando exclusivamente variables do design system

---

### ✅ PROMPT 4: Context Global e Gerenciamento de Estado
**Status:** ✅ CONCLUÍDO

⚠️ **REGRA CRÍTICA RESPEITADA:** NÃO usar localStorage, sessionStorage ou browser storage. Apenas React state.

- ✅ FinanceProvider criado com arrays: transactions, goals, creditCards, bankAccounts, familyMembers
- ✅ Funções CRUD implementadas para todas as 5 entidades (add, update, delete)
- ✅ Estados de filtros globais: selectedMember, dateRange, transactionType, searchText
- ✅ Funções de cálculo derivadas implementadas:
  - getFilteredTransactions (aplica todos os filtros)
  - calculateTotalBalance (saldos - faturas)
  - calculateIncomeForPeriod (receitas do período)
  - calculateExpensesForPeriod (despesas do período)
  - calculateExpensesByCategory (agrupado e ordenado)
  - calculateCategoryPercentage (percentual por categoria)
  - calculateSavingsRate (taxa de poupança)
- ✅ Hook useFinance criado para acesso ao contexto
- ✅ Dados mock iniciais realistas: 3 membros, 2 contas, 2 cartões, 30 transações (últimos 3 meses), 2 metas
- ✅ Integrado no App.tsx

---

### ✅ PROMPT 5: Cards de Resumo Financeiro
**Status:** ✅ CONCLUÍDO

- ✅ BalanceCard: fundo preto (secondary-900), círculo verde-limão desfocado (primary-500 com blur), badge de crescimento
- ✅ IncomeCard: fundo branco (surface-500), ícone seta baixo-esquerda, valor de receitas
- ✅ ExpenseCard: fundo branco (surface-500), ícone seta cima-direita, valor de despesas
- ✅ Animações de contagem nos valores (800ms com 60 steps)
- ✅ Layout responsivo: grid 1 coluna mobile, 3 colunas desktop (md:grid-cols-3)
- ✅ Integrado com FinanceContext: valores dinâmicos de calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod
- ✅ Cálculo de crescimento percentual comparando mês atual com mês anterior
- ✅ Usando exclusivamente variables do design system

---

### 📋 PROMPT 6: Header do Dashboard com Controles
**Status:** ⏳ PENDENTE

- Campo de busca com ícone de lupa (busca em tempo real)
- Botão de filtros com popover (desktop) ou modal (mobile)
- FilterPopover: tipo de transação (rádio), seletor de período com calendário
- Widget de membros da família (avatares sobrepostos, filtro por clique)
- Botão "Nova Transação" destacado
- Usar variables do design system

---

### 📋 PROMPT 7: Carrossel de Gastos por Categoria
**Status:** ⏳ PENDENTE

- ExpensesByCategoryCarousel processando calculateExpensesByCategory
- CategoryDonutCard: gráfico donut 64px, percentual centralizado, nome e valor
- Scroll horizontal com mouse wheel, drag, setas de navegação
- Gradiente de máscara nas bordas (fade effect)
- Hover nos cards: borda verde-limão
- Mobile: apenas scroll por toque

---

### 📋 PROMPT 8: Gráfico de Fluxo Financeiro
**Status:** ⏳ PENDENTE

- FinancialFlowChart usando Recharts
- Gráfico de área com receitas (verde-limão) e despesas (preto)
- Eixos: meses (X) e valores monetários (Y)
- Grid tracejado sutil
- Tooltip interativo com linha vertical
- Dados mock para 7 meses
- Usar variables do design system

---

### 📋 PROMPT 9: Widget de Cartões de Crédito
**Status:** ⏳ PENDENTE

- CreditCardsWidget com lista de cartões
- Cada card: ícone, informações, badge de percentual de uso
- Hover: elevação e sombra aumentada
- Clique abre modal de detalhes
- Paginação se mais de 3 cartões
- Mobile: suporte a swipe

---

### 📋 PROMPT 10: Widget de Próximas Despesas
**Status:** ⏳ PENDENTE

- Lista de despesas pendentes ordenadas por data de vencimento
- Cada item: descrição, data de vencimento, conta/cartão, valor, botão de check
- Ao marcar como paga: animação, remoção da lista, criação de próxima ocorrência se recorrente
- Estado vazio: "Nenhuma despesa pendente"
- Usar variables do design system

---

### 📋 PROMPT 11: Tabela de Transações Detalhada
**Status:** ⏳ PENDENTE

- TransactionsTable com 7 colunas: Avatar, Data, Descrição, Categoria, Conta/cartão, Parcelas, Valor
- Busca local e select de tipo
- Filtragem combinada (globais + locais)
- Zebra striping e hover nas linhas
- Paginação: 5 transações por página
- Contador "Mostrando 1 a 5 de 47"
- Estado vazio: "Nenhum lançamento encontrado"

---

### 📋 PROMPT 12: Modal de Nova Transação
**Status:** ⏳ PENDENTE

- Modal fullscreen com header, conteúdo scrollável e footer
- Toggle de tipo (Receita/Despesa)
- Campos: valor, descrição, categoria, membro, conta/cartão, parcelamento, despesa recorrente
- Validação completa antes de salvar
- Toast de sucesso ao salvar
- Usar variables do design system

---

### 📋 PROMPT 13: Modal de Adicionar Membro
**Status:** ⏳ PENDENTE

- Formulário: nome completo, função/papel, avatar (URL ou upload), renda mensal
- Validação: nome mínimo 3 caracteres, função obrigatória
- Toast de sucesso
- Novo membro aparece imediatamente nos avatares

---

### 📋 PROMPT 14: Modal de Adicionar Cartão
**Status:** ⏳ PENDENTE

- Toggle: Conta Bancária ou Cartão de Crédito
- Campos comuns: nome, titular
- Campos condicionais para conta: saldo inicial
- Campos condicionais para cartão: fechamento, vencimento, limite, últimos 4 dígitos, tema visual
- Validação completa
- Toast de sucesso

---

### 📋 PROMPT 15: Modal de Detalhes do Cartão
**Status:** ⏳ PENDENTE

- Informações: limite, fatura, disponível, percentual, datas, dígitos
- Representação visual do uso (donut ou barra)
- Tabela de despesas vinculadas ao cartão
- Botões de ação: Ver Extrato, Adicionar Despesa, Editar Cartão, Fechar

---

### 📋 PROMPT 16: Modal de Filtros Mobile
**Status:** ⏳ PENDENTE

- Modal slide-in de baixo para cima
- Header fixo, conteúdo scrollável, footer fixo
- Seções: tipo de transação, membro da família, período (calendário)
- Botão "Aplicar Filtros" aplica filtros temporários ao contexto global
- Fechar sem aplicar descarta mudanças

---

### 📋 PROMPT 17: View Completa de Cartões
**Status:** ⏳ PENDENTE

- CardsView com grid responsivo (1/2/3 colunas)
- Cards detalhados com todas as informações
- Hover e clicável (abre modal de detalhes)
- Estado vazio: "Nenhum cartão cadastrado"
- Ordenação por fatura ou alfabética

---

### 📋 PROMPT 18: View Completa de Transações
**Status:** ⏳ PENDENTE

- TransactionsView com filtros avançados
- Linha de resumo: totais de receitas, despesas, diferença, quantidade
- Tabela expandida (10 itens por página)
- Ordenação clicável nos headers
- Botão de exportar (CSV/PDF)
- Estado vazio apropriado

---

### 📋 PROMPT 19: View de Perfil - Aba Informações
**Status:** ⏳ PENDENTE

- ProfileView com sistema de abas
- Aba "Informações": perfil do usuário, membros da família
- Card de perfil: avatar, nome, função, email, renda
- Lista de membros com avatares
- Botão "Sair" vermelho

---

### 📋 PROMPT 20: View de Perfil - Aba Configurações
**Status:** ⏳ PENDENTE

- Aba "Configurações" com seções:
  - Preferências de exibição (modo escuro, moeda, formato de data)
  - Notificações (toggles)
  - Gerenciar Categorias
  - Dados e Privacidade (exportar, limpar)
  - Sobre o mycash+

---

### 📋 PROMPT 21: Animações e Transições Globais
**Status:** ⏳ PENDENTE

- Transições de navegação (fade-out/in)
- Animações de entrada para cards (fade-in + slide-up com stagger)
- Animações de hover consistentes
- Animações de loading para valores monetários
- Animações de barras de progresso
- Animações de modais (fade + scale)
- Animações de toasts (slide-in/out)
- Skeleton loaders
- Micro-interações
- Respeitar prefers-reduced-motion

---

### 📋 PROMPT 22: Formatação e Utilitários
**Status:** ⏳ PENDENTE

- Utilitários de moeda: formatCurrency, formatCompactCurrency, parseCurrencyInput
- Utilitários de data: formatDate, formatDateLong, formatDateRange, formatRelativeDate
- Utilitários de arrays: groupByCategory, filterByDateRange, sortByDate
- Utilitários de cálculos: calculatePercentage, calculateDifference, calculateInstallmentValue
- Utilitários de validação: isValidEmail, isValidCPF, isValidDate, isPositiveNumber
- Utilitários de ID: generateUniqueId
- Organizar em arquivos separados por categoria
- JSDoc comments e testes unitários

---

### 📋 PROMPT 23: Responsividade e Ajustes Finais
**Status:** ⏳ PENDENTE

- Revisão completa de responsividade
- Mobile-first: layout base sempre mobile
- Breakpoints: Mobile (<768px), Tablet (≥768px <1280px), Desktop (≥1280px <1920px), Wide (≥1920px)
- Sidebar apenas desktop, Header Mobile apenas mobile/tablet
- Grids fluidos (auto-fit/auto-fill)
- Tabela mobile: cards verticais
- Gráficos adaptativos
- Modais responsivos
- Touch targets mínimos (44x44px)
- Acessibilidade básica
- Validação em 375px, 768px, 1280px, 1920px

---

### 📋 PROMPT 24: Testes e Validação Final
**Status:** ⏳ PENDENTE

- Fluxo de teste completo (jornada do usuário)
- Validação de cálculos financeiros
- Validação de filtros combinados
- Validação de formatações
- Validação de responsividade
- Validação de modais
- Validação de acessibilidade
- Validação de performance
- Tratamento de erros
- Mensagens de feedback
- Documentação de comportamentos

---

### 🎉 PROMPT FINAL: Revisão e Entrega
**Status:** ⏳ PENDENTE

- Checklist completo de qualidade
- Revisão de organização do código
- Revisão de comentários e documentação
- Otimização de performance
- Preparação para integração com Supabase
- Documentação de componentes principais
- Relatório final

---

## 📊 Resumo do Progresso

- ✅ **Concluídos:** 6 prompts (0, 1, 2, 3, 4, 5)
- ⏳ **Pendentes:** 18 prompts (6-24)
- 📈 **Progresso:** 25.0%

## 🔄 Fluxo de Execução

Para cada prompt:
1. Reler Rules + Documentação
2. Consultar Figma (layout + variáveis)
3. Executar prompt
4. `npm run build` (até sucesso)
5. Informar e aguardar aprovação
6. Documentar + Commit
7. Perguntar se pode seguir para próximo

## 🎨 Hierarquia de Variáveis (CRÍTICO)

1. Variável SEMÂNTICA → Usar
2. Variável PRIMITIVA → Usar
3. Valor local → Converter para token mais próximo
4. NUNCA usar hardcoded

## 📤 Formato de Resposta Obrigatório

Após cada prompt:
- ✅ PROMPT [N]: [Nome] — CONCLUÍDO
- 📚 PRÉ-EXECUÇÃO
- 📦 IMPLEMENTADO
- 🎨 TOKENS UTILIZADOS
- 📁 ARQUIVOS CRIADOS/MODIFICADOS
- 🔨 BUILD STATUS
- 💾 COMMIT REALIZADO
- 🤔 PRÓXIMOS PASSOS
