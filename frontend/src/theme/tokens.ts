/**
 * tokens.ts — cores e fontes do design system "Precision Ledger" que não
 * têm um lugar direto no palette do MUI (ver theme/index.ts para as que
 * têm: primary, secondary, error, background, text, divider).
 *
 * Espelha design/assets/tailwind-config.js — se o design mudar lá, muda
 * aqui também. Fonte original: design/dashboard_financeiro/precision_ledger.
 */

export const colors = {
  outline: "#737686",
  outlineVariant: "#c3c6d7",

  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f3f4f5",
  surfaceContainer: "#edeeef",
  surfaceContainerHigh: "#e7e8e9",
  surfaceContainerHighest: "#e1e3e4",

  inverseSurface: "#2e3132",
  inverseOnSurface: "#f0f1f2",

  primaryFixed: "#dbe1ff",
  secondaryContainer: "#6cf8bb",
  onSecondaryContainer: "#00714d",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
} as const;

export const fonts = {
  sans: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;
