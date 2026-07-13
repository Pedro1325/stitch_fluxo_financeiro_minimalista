import { createTheme } from "@mui/material/styles";
import { colors, fonts } from "./tokens";

/**
 * Tema MUI a partir do design system "Precision Ledger"
 * (design/dashboard_financeiro/precision_ledger).
 *
 * Tokens sem equivalente direto no palette do MUI (surface-container-*,
 * outline, etc.) ficam em ./tokens.ts e são usados via sx nos componentes.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#004ac6",
      light: colors.primaryFixed,
      dark: "#2563eb",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#006c49",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ba1a1a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#191c1d",
      secondary: "#434655",
    },
    divider: colors.outlineVariant,
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: fonts.sans,
    // text-display-lg: títulos de página
    h1: {
      fontSize: "36px",
      lineHeight: "44px",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    // text-headline-md: logo, título do header de tarefa
    h2: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    // text-title-sm: títulos de card/seção
    subtitle1: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 600,
    },
    // text-body-md
    body1: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
    },
    // text-body-sm
    body2: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
    },
    // text-label-caps: rótulos em caixa alta (usar <Typography variant="overline">)
    overline: {
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        // Elevação por borda de 1px, não sombra — mais fiel ao visual "Stripe-like" do design
        root: {
          border: `1px solid ${colors.outlineVariant}`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
