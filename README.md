# FinanceFlow — Fluxo Financeiro Minimalista

> Aplicação de controle financeiro pessoal/empresarial para o seu tio controlar os gastos "na ponta do lápis".

## Status do Projeto

**Em migração:** HTML + CSS + Tailwind → React + TypeScript + Material UI + Apollo Client

## Stack (Destino)

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript |
| UI | Material UI (MUI) v5 |
| Estado Global | Apollo Client (GraphQL) |
| Build | Vite |
| API | .NET (C#) — a ser definida |
| Roteamento | React Router DOM v6 |

## Estrutura de Pastas (Alvo)

```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/          # AppBar, Sidebar, BottomNav, Footer
│   ├── shared/          # Botões, Cards, Tabelas reutilizáveis
│   └── charts/          # Gráficos (DonutChart, BarChart)
├── pages/               # Páginas da aplicação
│   ├── Dashboard/       # Home com resumo financeiro
│   ├── ExpenseList/     # Lista de despesas com busca/filtros
│   ├── NewExpense/      # Formulário de nova despesa
│   └── Reports/         # Relatórios e análise
├── graphql/             # Queries, Mutations, Fragmentos
│   ├── queries/
│   ├── mutations/
│   └── fragments/
├── types/               # Interfaces TypeScript (modelos de dados)
├── theme/               # Tema MUI (cores, tipografia, spacing)
├── hooks/               # Custom hooks
├── utils/               # Funções utilitárias
└── App.tsx              # Raiz da aplicação com rotas
```

## Design System

O design system está documentado em `pages/dashboard_financeiro/precision_ledger/DESIGN.md`.

Princípios:
- **Funcional Minimalismo** — clareza e velocidade para dados financeiros
- **Cores:** Azul (#004ac6) para ações primárias, Verde (#006c49) para positivo, Vermelho (#ba1a1a) para negativo
- **Tipografia:** Inter (corpo) + JetBrains Mono (dados numéricos)
- **Espaçamento:** Escala 8px com incrementos de 4px

## Telas (HTML Original → React)

### 1. Dashboard (Home)
- **Arquivo original:** `pages/dashboard_financeiro/code.html`
- **Componentes a criar:**
  - `AppBar` — TopAppBar com navegação + notificações
  - `BottomNav` — Navegação inferior (mobile)
  - `WelcomeSection` — Saudação + filtro de período
  - `BalanceCard` — Card de saldo total (bento grid)
  - `ExpenseBreakdownCard` — Cards de despesas (Personal/Business)
  - `RecentTransactions` — Tabela de transações recentes
  - `SpendingByCategory` — Gráfico de donut + legenda
  - `QuickActionCard` — Card promocional/quick action
  - `Fab` — Floating Action Button para nova despesa

### 2. Lista de Despesas
- **Arquivo original:** `pages/dashboard_financeiro/lista_de_despesas/code.html`
- **Componentes a criar:**
  - `SearchBar` — Campo de busca com ícone
  - `FilterChips` — Filtros All/Personal/Business
  - `ExpenseTable` — Tabela responsiva com Data/Description/Category/Type/Amount
  - `Pagination` — Navegação entre páginas

### 3. Nova Despesa
- **Arquivo original:** `pages/dashboard_financeiro/nova_despesa/code.html`
- **Componentes a criar:**
  - `ExpenseToggle` — Segmented control Personal/Business
  - `AmountInput` — Input de valor em destaque
  - `ExpenseForm` — Formulário completo (descrição, categoria, data, observações)
  - `AttachmentUpload` — Área de upload de comprovante

### 4. Relatórios
- **Arquivo original:** `pages/dashboard_financeiro/relat_rios_de_gastos/code.html`
- **Componentes a criar:**
  - `PeriodToggle` — Segmented control Monthly/Annual
  - `SpendingComparisonChart` — Gráfico de barras comparativo
  - `TotalOutflowCard` — Card de saída total com progresso
  - `ForecastCard` — Card de previsão
  - `CategoryBreakdownTable` — Tabela de categorias com barras de alocação
  - `ExportButton` — Botão de exportar PDF

## Plano de Migração (Passo a Passo)

Cada passo será feito sob demanda, explicando decisões de arquitetura antes de codificar.

| # | Passo | Descrição |
|---|-------|-----------|
| # | Passo | Descrição |
|---|-------|-----------|
| 1 | Setup | Criar projeto Vite + React + TS, instalar dependências (MUI, Apollo, React Router) |
| 2 | Login | Tela de autenticação com email/senha, validação JWT, contexto de auth, rotas protegidas |
| 3 | Tema MUI | Configurar tema com cores e tipografia do design system |
| 4 | Layout Base | AppBar + BottomNav + estrutura de rotas |
| 5 | Dashboard | Componentes da Home (cards, tabela, gráfico) |
| 6 | Lista de Despesas | Tabela com busca, filtros, paginação |
| 7 | Nova Despesa | Formulário com validação |
| 8 | Relatórios | Gráficos e tabela de análise |
| 9 | Apollo Client | Conectar a API .NET (GraphQL) |
| 10 | GraphQL Queries | Queries e mutations reais |

## Convenções de Código

- **Nomenclatura:** PascalCase para componentes, camelCase para funções/variáveis
- **Arquivos:** `ComponentName.tsx` + `ComponentName.test.tsx` (quando houver testes)
- **Estilização:** `sx` prop do MUI para estilos específicos; `styled()` para componentes reutilizáveis
- **Imports:** Agrupados por (1) React, (2) Bibliotecas externas, (3) Componentes internos, (4) Tipos
- **Comentários:** Apenas quando necessário explicar decisão não óbvia

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit
```

## Decisões Pendentes

- **Local do projeto React:** Recomendo subpasta (`./frontend/` ou `./web/`) para manter HTMLs originais intactos como referência.

## Próxima Sessão

1. Confirmar local do projeto (raiz vs subpasta)
2. Rodar `npm create vite@latest` com template React + TypeScript
3. Instalar dependências: MUI, Apollo Client, React Router, Emotion
4. Estruturar pastas iniciais
5. Criar tela de Login com JWT

---

> **Nota:** Este README será atualizado conforme o projeto evolui.
