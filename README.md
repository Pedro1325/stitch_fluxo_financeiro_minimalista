# FinanceFlow — Fluxo Financeiro Minimalista

> Aplicação de controle financeiro pessoal/empresarial para o seu tio controlar os gastos "na ponta do lápis".

## Status do Projeto

**Em migração:** HTML + CSS + Tailwind → React + TypeScript + Material UI + Apollo Client

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript 6 |
| UI | Material UI (MUI) v9 |
| Dados (server state) | Apollo Client v4 (GraphQL) |
| Build | Vite 8 |
| Lint | oxlint |
| API | .NET (C#) + HotChocolate (GraphQL) — a construir |
| Roteamento | React Router DOM v7 |
| Node | v24 (ver `.nvmrc` — rode `nvm use` na raiz) |

> **Nota:** Apollo Client gerencia *estado de servidor* (dados vindos da API, com cache). Estado de UI (modais, filtros locais) fica em `useState`/contexto — são responsabilidades diferentes.

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
Autenticação fica por último de propósito: implementar JWT sem backend real seria teatro — ela entra quando existe API e dados de verdade para proteger.

| # | Passo | Descrição | Status |
|---|-------|-----------|--------|
| 1 | Setup | Projeto Vite + React + TS em `frontend/`, dependências (MUI, Apollo, Router), `.nvmrc` | ✅ |
| 2 | Tema MUI | Configurar tema com cores e tipografia do design system (Precision Ledger) | |
| 3 | Layout Base | AppBar + BottomNav + estrutura de rotas | |
| 4 | Dashboard | Componentes da Home (cards, tabela, gráfico) — dados mockados | |
| 5 | Lista de Despesas | Tabela com busca, filtros, paginação — dados mockados | |
| 6 | Nova Despesa | Formulário com validação | |
| 7 | Relatórios | Gráficos e tabela de análise | |
| 8 | API .NET | Projeto C# + HotChocolate, modelagem (Expense, Category), queries/mutations | |
| 9 | Integração | Apollo Client apontando pra API real, remover mocks | |
| 10 | Autenticação | Login, JWT/refresh token, contexto de auth, rotas protegidas | |

## Convenções de Código

- **Nomenclatura:** PascalCase para componentes, camelCase para funções/variáveis
- **Arquivos:** `ComponentName.tsx` + `ComponentName.test.tsx` (quando houver testes)
- **Estilização:** `sx` prop do MUI para estilos específicos; `styled()` para componentes reutilizáveis
- **Imports:** Agrupados por (1) React, (2) Bibliotecas externas, (3) Componentes internos, (4) Tipos
- **Comentários:** Apenas quando necessário explicar decisão não óbvia

## Comandos Úteis

```bash
# Na raiz do repositório: usar a versão de Node do projeto
nvm use

# Dentro de frontend/
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit
```

## Decisões Tomadas

- **Local do projeto React:** subpasta `./frontend/`; HTMLs do Stitch mantidos em `pages/` como referência de design.
- **GraphQL + Apollo:** escolha consciente com objetivo de aprendizado (a alternativa mais simples seria REST + TanStack Query).
- **MUI v9** com tema customizado para o design system Precision Ledger.
- **Node 24** fixado via `.nvmrc` (Node 18 está em EOL).

## Próxima Sessão

1. Passo 2: criar tema MUI (`frontend/src/theme/`) a partir do `DESIGN.md`
2. Limpar boilerplate do template Vite (`App.tsx`, CSS de exemplo)

---

> **Nota:** Este README será atualizado conforme o projeto evolui.
