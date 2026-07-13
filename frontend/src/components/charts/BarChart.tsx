import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export interface BarChartDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDatum[];
  formatValue: (value: number) => string;
}

/**
 * Gráfico de barras simples (altura proporcional ao maior valor).
 * Mesma ideia do protótipo em design/relatorios.html, adaptada para usar
 * <Tooltip> do MUI em vez de group-hover em CSS puro.
 */
function BarChart({ data, formatValue }: BarChartProps) {
  const maxValue = Math.max(...data.map((bar) => bar.value));
  const ariaLabel = `Gráfico de barras: ${data.map((bar) => `${bar.label} ${formatValue(bar.value)}`).join(", ")}`;

  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, height: 256, pt: 2 }}
    >
      {data.map((bar) => (
        <Box
          key={bar.label}
          aria-hidden="true"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flex: 1, height: "100%" }}
        >
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end" }}>
            <Tooltip title={formatValue(bar.value)} arrow>
              <Box
                sx={{
                  width: "100%",
                  height: `${(bar.value / maxValue) * 100}%`,
                  bgcolor: "primary.main",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="overline" color="text.secondary" noWrap>
            {bar.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default BarChart;
