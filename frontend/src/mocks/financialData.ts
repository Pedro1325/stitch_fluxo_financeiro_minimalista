/**
 * financialData.ts — dados MOCKADOS para as telas funcionarem sem backend.
 *
 * TODO(API): quando a API .NET + HotChocolate existir (README, passo 8/9),
 * cada um destes exports vira o resultado de um useQuery do Apollo Client
 * (ver src/graphql/client.ts para o endpoint). Por ora, todas as páginas
 * importam diretamente daqui.
 */

import type { CategoryBreakdownRow, CategorySlice, Expense } from "../types";

export const allExpenses: Expense[] = [
  { id: "e1", description: "Apple Store", categoryLabel: "Eletrônicos", type: "pessoal", kind: "saida", amount: 1299.0, date: "2026-07-13" },
  { id: "e2", description: "Mizu Sushi", categoryLabel: "Alimentação", type: "pessoal", kind: "saida", amount: 84.5, date: "2026-07-13" },
  { id: "e3", description: "Supermercado Zaffari", categoryLabel: "Mercado", type: "pessoal", kind: "saida", amount: 142.5, date: "2026-07-12" },
  { id: "e4", description: "AWS Cloud Services", categoryLabel: "Nuvem", type: "empresa", kind: "saida", amount: 850.0, date: "2026-07-11" },
  { id: "e5", description: "LATAM Airlines", categoryLabel: "Viagem", type: "pessoal", kind: "saida", amount: 450.0, date: "2026-07-10" },
  { id: "e6", description: "Café Cultura", categoryLabel: "Alimentação", type: "pessoal", kind: "saida", amount: 6.75, date: "2026-07-09" },
  { id: "e7", description: "Uber", categoryLabel: "Transporte", type: "pessoal", kind: "saida", amount: 22.4, date: "2026-07-08" },
  { id: "e8", description: "Apple Store — MacBook", categoryLabel: "Equipamentos", type: "empresa", kind: "saida", amount: 12499.0, date: "2026-07-07" },
  { id: "e9", description: "Netflix", categoryLabel: "Software e assinaturas", type: "pessoal", kind: "saida", amount: 39.9, date: "2026-07-06" },
  { id: "e10", description: "Posto Ipiranga", categoryLabel: "Transporte", type: "pessoal", kind: "saida", amount: 180.0, date: "2026-07-05" },
  { id: "e11", description: "Farmácia São João", categoryLabel: "Saúde", type: "pessoal", kind: "saida", amount: 96.3, date: "2026-07-04" },
  { id: "e12", description: "Microsoft 365", categoryLabel: "Software e assinaturas", type: "empresa", kind: "saida", amount: 129.0, date: "2026-07-03" },
  { id: "e13", description: "Cinemark", categoryLabel: "Lazer", type: "pessoal", kind: "saida", amount: 68.0, date: "2026-07-02" },
  { id: "e14", description: "Salário", categoryLabel: "Receita", type: "pessoal", kind: "entrada", amount: 8500.0, date: "2026-07-01" },
  { id: "e15", description: "Aluguel do escritório", categoryLabel: "Moradia", type: "empresa", kind: "saida", amount: 3200.0, date: "2026-06-29" },
  { id: "e16", description: "Plano de saúde", categoryLabel: "Saúde", type: "empresa", kind: "saida", amount: 640.0, date: "2026-06-27" },
  { id: "e17", description: "Restaurante Galeto's", categoryLabel: "Alimentação", type: "empresa", kind: "saida", amount: 210.0, date: "2026-06-25" },
  { id: "e18", description: "Reembolso de cliente", categoryLabel: "Receita", type: "empresa", kind: "entrada", amount: 1500.0, date: "2026-06-20" },
];

const RECENT_TRANSACTION_IDS = ["e1", "e2", "e5", "e14"];

/** As 4 primeiras transações + a última receita, para caber no card da Home. */
export const recentTransactions: Expense[] = allExpenses.filter((expense) =>
  RECENT_TRANSACTION_IDS.includes(expense.id),
);

/** Resumo do mês para os cartões "bento" da Home — hoje viria de uma query agregada da API. */
export const monthlySummary = {
  balance: 42580.0,
  balanceTrendPct: 12.5,
  personalTotal: 12430.2,
  personalBudgetPct: 45,
  businessTotal: 28149.8,
  businessBudgetPct: 72,
};

/** Gastos por grande categoria, usados no donut da Home. */
export const dashboardCategorySlices: CategorySlice[] = [
  { label: "Empresa", value: 45, color: "#004ac6" },
  { label: "Estilo de vida", value: 25, color: "#006c49" },
  { label: "Viagem", value: 15, color: "#ba1a1a" },
  { label: "Outros", value: 15, color: "#c3c6d7" },
];
export const dashboardCategoryTotalLabel = "R$ 40,5 mil";

/** Detalhamento por categoria da tela de Relatórios (soma bate com `reportTotalOutflow`). */
export const reportCategoryBreakdown: CategoryBreakdownRow[] = [
  { name: "Moradia e aluguel", amount: 4250.0, allocationPct: 29, status: "no-orcamento" },
  { name: "Alimentação", amount: 2100.0, allocationPct: 14, status: "acima-orcamento" },
  { name: "Transporte", amount: 3000.0, allocationPct: 21, status: "no-orcamento" },
  { name: "Saúde", amount: 1500.0, allocationPct: 10, status: "no-orcamento" },
  { name: "Contas", amount: 2500.0, allocationPct: 17, status: "acima-orcamento" },
  { name: "Lazer", amount: 1200.0, allocationPct: 8, status: "no-orcamento" },
];

export const reportTotalOutflow = 14550.0;
export const reportBudgetUsedPct = 92;
export const reportForecastNextMonth = 13200.0;
export const reportTrendVsPreviousMonthPct = -12.4;
