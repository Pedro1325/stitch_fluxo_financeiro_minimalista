# FinanceFlow — Fluxo Financeiro Minimalista

> Aplicação de controle financeiro pessoal/empresarial para o seu tio controlar os gastos "na ponta do lápis".

## Status do Projeto

**Frontend concluído com dados mockados.** As 4 telas (Dashboard, Despesas,
Nova Despesa, Relatórios) estão implementadas em React + MUI e navegáveis
de ponta a ponta. Falta apenas a API: hoje elas leem de `src/mocks/`.
Todo ponto que vai virar uma chamada real está marcado com `// TODO(API)`
no código — comece por `frontend/src/graphql/client.ts`.

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

## Estrutura de Pastas

```
frontend/src/
├── components/
│   ├── layout/          # AppLayout (shell completo) + TaskLayout (shell de tarefa)
│   ├── shared/           # SegmentedControl (filtros/toggles em pílula)
│   └── charts/           # DonutChart, BarChart (SVG puro, sem lib externa)
├── pages/
│   ├── Dashboard/        # Home: bento grid, transações recentes, donut
│   ├── ExpenseList/       # Busca, filtro por tipo, lista paginada
│   ├── NewExpense/         # Formulário com validação
│   ├── Reports/            # Comparativo, previsão, tabela por categoria
│   └── Login/               # Placeholder — autenticação é o último passo (ver plano)
├── graphql/
│   ├── client.ts         # PONTO DE INTEGRAÇÃO — endpoint da API entra aqui
│   └── queries/, mutations/, fragments/  # a preencher junto com o passo 9
├── mocks/                # financialData.ts — dados de exemplo até a API existir
├── types/                # Expense, CategorySlice, CategoryBreakdownRow
├── theme/                # index.ts (createTheme) + tokens.ts (cores/fontes do design)
├── utils/                # format.ts (moeda/data), categoryIcon.tsx
└── App.tsx / AppRoutes.tsx
```

## Design System

Fonte de verdade: `design/assets/tailwind-config.js` (paleta, espaçamento, tipografia)
e `design/assets/theme.css` (estilos globais). Os HTMLs em `design/*.html` são o
protótipo estático que guiou a implementação em React.

Princípios:
- **Funcional Minimalismo** — clareza e velocidade para dados financeiros
- **Cores:** Azul (#004ac6) para ações primárias, Verde (#006c49) para positivo, Vermelho (#ba1a1a) para negativo
- **Tipografia:** Inter (corpo) + JetBrains Mono (dados numéricos)
- **Espaçamento:** Escala 8px com incrementos de 4px

## Telas (HTML Original → React)

Todas as 4 implementadas em `frontend/src/pages/`, com dados de
`frontend/src/mocks/financialData.ts`.

### 1. Dashboard (Home) ✅
- **Protótipo:** `design/index.html`
- Saudação + filtro de período (`SegmentedControl`), bento grid (saldo,
  pessoal, empresa com barra de orçamento), tabela de transações recentes,
  `DonutChart` de gastos por categoria, atalho para Relatórios.

### 2. Lista de Despesas ✅
- **Protótipo:** `design/despesas.html`
- Busca por texto (client-side, ver `TODO(API)` na página), filtro
  Todas/Pessoal/Empresa, lista responsiva, paginação incremental ("carregar mais").

### 3. Nova Despesa ✅
- **Protótipo:** `design/nova-despesa.html`
- Toggle Pessoal/Empresa, valor em destaque, formulário completo com
  validação (descrição, categoria, data, observações), upload de
  comprovante, barra de ação fixa. Ao salvar, ainda **não persiste** —
  ver `TODO(API)` em `NewExpense/index.tsx`.

### 4. Relatórios ✅
- **Protótipo:** `design/relatorios.html`
- Toggle Mensal/Anual, `BarChart` comparativo, card de saída total com
  progresso, previsão do próximo mês, tabela de categorias com status e
  alocação. Botão de exportar PDF é só visual — ver `TODO(API)`.

## Plano de Migração (Passo a Passo)

Cada passo será feito sob demanda, explicando decisões de arquitetura antes de codificar.
Autenticação fica por último de propósito: implementar JWT sem backend real seria teatro — ela entra quando existe API e dados de verdade para proteger.

| # | Passo | Descrição | Status |
|---|-------|-----------|--------|
| 1 | Setup | Projeto Vite + React + TS em `frontend/`, dependências (MUI, Apollo, Router), `.nvmrc` | ✅ |
| 2 | Tema MUI | Configurar tema com cores e tipografia do design system (Precision Ledger) | ✅ |
| 3 | Layout Base | AppBar + BottomNav + estrutura de rotas | ✅ |
| 4 | Dashboard | Componentes da Home (cards, tabela, gráfico) — dados mockados | ✅ |
| 5 | Lista de Despesas | Tabela com busca, filtros, paginação — dados mockados | ✅ |
| 6 | Nova Despesa | Formulário com validação | ✅ |
| 7 | Relatórios | Gráficos e tabela de análise | ✅ |
| 8 | API .NET | Projeto C# + HotChocolate, modelagem (Expense, Category), queries/mutations | 🔜 **por sua conta** |
| 9 | Integração | Apollo Client apontando pra API real, remover mocks | 🔜 **por sua conta** |
| 10 | Autenticação | Login, JWT/refresh token, contexto de auth, rotas protegidas | 🔜 **por sua conta** |

> Passos 8–10 ficam com você (backend). O `ApolloProvider` já está plugado em
> `main.tsx` e o `ApolloClient` em `frontend/src/graphql/client.ts` — falta só
> a API existir e você criar `frontend/.env` (veja `.env.example`) apontando
> `VITE_GRAPHQL_ENDPOINT` para ela.

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

- **Local do projeto React:** subpasta `./frontend/`; HTMLs do Stitch mantidos em `design/` como referência de design.
- **GraphQL + Apollo:** escolha consciente com objetivo de aprendizado (a alternativa mais simples seria REST + TanStack Query).
- **MUI v9** com tema customizado para o design system Precision Ledger.
- **Node 24** fixado via `.nvmrc` (Node 18 está em EOL).
- **Dados mockados em `src/mocks/financialData.ts`**, não em cada página: um único
  lugar para trocar por queries reais quando a API existir, em vez de caçar
  números espalhados pelo código.
- **Sem lib de gráficos:** `DonutChart`/`BarChart` são SVG/CSS puro (mesma
  técnica dos protótipos HTML) — dispensa dependência extra para 2 gráficos simples.
- **Ícones do Material Symbols (fonte, usada no protótipo) trocados por
  `@mui/icons-material`** (componentes React), já que essa dependência
  já estava instalada e integra melhor com o tema MUI que carregar uma fonte de ícones à parte.

## Próxima Sessão (backend)

1. Passo 8: criar a API .NET + HotChocolate (`Expense`, `Category`, queries e mutations
   que casem com o que as páginas esperam — ver `frontend/src/types/index.ts` e os
   comentários `TODO(API)` em cada página/mock para o formato exato dos dados).
2. Passo 9: criar `frontend/.env` com `VITE_GRAPHQL_ENDPOINT`, escrever as queries/mutations
   em `frontend/src/graphql/queries|mutations`, e trocar os imports de `mocks/financialData`
   por `useQuery`/`useMutation` página a página.
3. Passo 10: autenticação (só depois de 8 e 9, ver nota no início deste README).

---

> **Nota:** Este README será atualizado conforme o projeto evolui.
