export type ExpenseType = "pessoal" | "empresa";
export type ExpenseKind = "saida" | "entrada";

export interface Expense {
  id: string;
  description: string;
  categoryLabel: string;
  type: ExpenseType;
  kind: ExpenseKind;
  amount: number;
  /** ISO 8601 (yyyy-mm-dd) */
  date: string;
}

/** Uma fatia do gráfico de rosca. `value` é percentual (0-100). */
export interface CategorySlice {
  label: string;
  value: number;
  color: string;
}

export type BudgetStatus = "no-orcamento" | "acima-orcamento";

export interface CategoryBreakdownRow {
  name: string;
  amount: number;
  allocationPct: number;
  status: BudgetStatus;
}
