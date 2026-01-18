# MyCash+ Dashboard

Dashboard financeiro desenvolvido com React, TypeScript, Vite e Tailwind CSS, seguindo rigorosamente o Design System do Figma.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes UI reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Avatar.tsx
│   │   └── CircularProgress.tsx
│   └── layout/          # Componentes de layout
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── HeaderMobile.tsx
│       └── MainLayout.tsx
├── pages/               # Páginas da aplicação
│   └── DashboardPage.tsx
├── hooks/               # Custom hooks
│   └── useSidebar.ts
├── services/            # Camada de API/Supabase
├── types/              # Definições TypeScript
│   └── index.ts
├── assets/             # Imagens, ícones, etc
└── styles/             # Estilos globais
    └── index.css
```

## 🎨 Design System

O projeto utiliza tokens do Design System do Figma:

- **Cores Semânticas:** Primary, Secondary, Surface, Background
- **Cores Primitivas:** Neutral, Brand, Blue, Green, Red
- **Espaçamentos:** Escala de 0 a 56px
- **Tipografia:** Heading, Label, Paragraph com pesos e tamanhos definidos
- **Shape:** Border radius (2px, 20px, 100px)

### Breakpoints
- **Mobile (base):** < 768px
- **Tablet:** ≥ 768px e < 1280px
- **Desktop:** ≥ 1280px e < 1920px
- **Wide / 4K:** ≥ 1920px

## 📐 Regras de Layout

### Layout Fluido (OBRIGATÓRIO)
- Containers principais: `width: 100%`
- Limitação de largura: usar `max-width`, nunca `width` fixa
- Overflow horizontal: **PROIBIDO** em qualquer resolução
- Frames do Figma: interpretados como wrappers fluidos

### Responsividade
- **Mobile-first:** Design base sempre parte do mobile
- **Sidebar:** Apenas desktop (≥1280px), não renderiza no mobile
- **Header Mobile:** Apenas mobile/tablet (<1280px)
- **Grids:** Auto-fit/auto-fill, nunca hardcoded

## 🧩 Componentes Principais

### Layout
- **MainLayout:** Gerencia renderização condicional de Sidebar/HeaderMobile
- **Sidebar:** Navegação desktop com estados expanded/collapsed
- **Header:** Barra superior com busca, filtros e ações
- **HeaderMobile:** Menu mobile com drawer

### UI
- **Button:** Variantes primary, secondary, ghost
- **Card:** Container com padding configurável
- **Input:** Campo de entrada com estados de erro
- **Avatar:** Avatar circular com iniciais ou imagem
- **CircularProgress:** Indicador de progresso circular

## 🎯 Hierarquia de Variáveis

Ao converter estilos do Figma para código, seguir esta ordem:

1. **Variável SEMÂNTICA** → Usar diretamente
2. **Variável PRIMITIVA** → Usar diretamente
3. **Valor local (hex, px)** → Converter para token mais próximo
4. **NUNCA** usar valores hardcoded

## 📚 Documentação dos Prompts

A documentação completa de cada prompt implementado está em `docs/`:

- [PROMPT-0.md](./docs/PROMPT-0.md) - Análise e Planejamento Inicial
- [PROMPT-1.md](./docs/PROMPT-1.md) - Estrutura Base do Projeto

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Supabase** - Backend (a ser integrado)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview da build de produção
npm run lint     # Verifica erros de código
```

## 🔗 Links

- **Design System:** https://www.figma.com/file/qQnK033w34s3i4z5j6l7m8/MyCashPlus-Design-System
- **Dashboard:** https://www.figma.com/design/HUEscthBx2Ar4YPQaxyW3R/mycash-?node-id=42-3096

## 📄 Licença

Este projeto é privado e desenvolvido para fins educacionais.
