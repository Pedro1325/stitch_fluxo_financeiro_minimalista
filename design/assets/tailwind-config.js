/**
 * tailwind-config.js — Tema "Precision Ledger"
 *
 * PROBLEMA QUE ESTE ARQUIVO RESOLVE (code smell: duplicação):
 * O Stitch exportou a MESMA configuração de tema copiada e colada dentro
 * de cada um dos 4 HTMLs (~90 linhas repetidas por página). Se você
 * mudasse uma cor, teria que mudar em 4 lugares — receita certa para
 * inconsistência. Extrair para um arquivo único é o princípio DRY
 * (Don't Repeat Yourself): uma única fonte de verdade para o tema.
 *
 * Este arquivo espelha o design system documentado em
 * pages/dashboard_financeiro/precision_ledger/DESIGN.md.
 * Na migração para React, estes tokens viram o createTheme() do MUI.
 *
 * Como funciona: o CDN do Tailwind lê a variável global `tailwind.config`
 * quando a página carrega. Por isso este script deve vir DEPOIS do
 * <script src="https://cdn.tailwindcss.com"> em cada página.
 */
tailwind.config = {
  theme: {
    extend: {
      /*
       * Paleta no padrão Material Design 3:
       * - "primary"      → cor de destaque (ações, links ativos)
       * - "on-primary"   → cor do TEXTO quando o fundo é primary
       * - "surface-*"    → camadas de fundo (do mais claro ao mais escuro)
       * - "outline-*"    → bordas e divisores
       * O prefixo "on-" sempre significa "conteúdo em cima daquela cor",
       * garantindo contraste acessível entre fundo e texto.
       */
      colors: {
        primary: "#004ac6",
        "on-primary": "#ffffff",
        "primary-container": "#2563eb",
        "on-primary-container": "#eeefff",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b4c5ff",

        // Verde semântico: reservado para valores positivos (receitas, "no orçamento")
        secondary: "#006c49",
        "on-secondary": "#ffffff",
        "secondary-container": "#6cf8bb",
        "on-secondary-container": "#00714d",
        "secondary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#4edea3",

        // Vermelho semântico: valores negativos, alertas, ações destrutivas
        tertiary: "#ab0b1c",
        "on-tertiary": "#ffffff",
        "tertiary-fixed": "#ffdad7",
        "on-tertiary-fixed-variant": "#930013",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Neutros: criam a hierarquia estrutural (fundo → cartão → chip)
        background: "#f8f9fa",
        "on-background": "#191c1d",
        surface: "#f8f9fa",
        "on-surface": "#191c1d",
        "surface-variant": "#e1e3e4",
        "on-surface-variant": "#434655",
        "surface-dim": "#d9dadb",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "inverse-surface": "#2e3132",
        "inverse-on-surface": "#f0f1f2",
        outline: "#737686",
        "outline-variant": "#c3c6d7",
      },

      /*
       * Raio de borda: "afiado e preciso" (ver DESIGN.md).
       * 4px para elementos pequenos, 8px para cartões.
       */
      borderRadius: {
        DEFAULT: "0.125rem", // 2px
        lg: "0.25rem", //       4px — inputs, botões pequenos, tags
        xl: "0.5rem", //        8px — cartões e modais
        full: "9999px", //      pílulas e círculos
      },

      /*
       * Escala de espaçamento nomeada (base 8px, incrementos de 4px).
       * Usar nomes ("md", "lg") em vez de números mágicos torna o
       * espaçamento consistente e fácil de ajustar globalmente.
       */
      spacing: {
        base: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        gutter: "24px",
        "container-max": "1280px", // largura máxima do conteúdo no desktop
      },

      /*
       * CODE SMELL REMOVIDO: o export original criava uma "fontFamily"
       * por estilo de texto (font-title-sm, font-body-md...), todas
       * apontando para a mesma Inter — redundante. Só existem DUAS
       * famílias de verdade: Inter (texto) e JetBrains Mono (números,
       * para os dígitos alinharem verticalmente em tabelas).
       */
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      /*
       * Escala tipográfica: cada entrada já embute tamanho, altura de
       * linha, espaçamento e peso — use ex.: class="text-display-lg".
       */
      fontSize: {
        "display-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title-sm": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "mono-data": ["14px", { lineHeight: "20px", fontWeight: "500" }],
      },
    },
  },
};
