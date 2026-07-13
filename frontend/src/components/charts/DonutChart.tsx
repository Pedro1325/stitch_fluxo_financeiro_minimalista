import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { CategorySlice } from "../../types";
import { fonts } from "../../theme/tokens";

interface DonutChartProps {
  data: CategorySlice[];
  centerLabel: string;
  centerValue: string;
}

// Raio escolhido para a circunferência do círculo dar ~100, então
// stroke-dasharray bate 1:1 com os percentuais de `data`.
const RADIUS = 15.9155;
const TRACK_PATH = `M18 2.0845 a ${RADIUS} ${RADIUS} 0 0 1 0 31.831 a ${RADIUS} ${RADIUS} 0 0 1 0 -31.831`;

/**
 * Gráfico de rosca em SVG puro (mesma técnica do protótipo em
 * design/dashboard_financeiro/): cada fatia é o mesmo círculo, desenhado
 * parcialmente via stroke-dasharray, deslocado por stroke-dashoffset para
 * começar onde a fatia anterior parou.
 */
function DonutChart({ data, centerLabel, centerValue }: DonutChartProps) {
  let offset = 0;
  const ariaLabel = `Gráfico: ${data.map((slice) => `${slice.label} ${slice.value}%`).join(", ")}`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ position: "relative", width: 176, height: 176, mb: 2 }} role="img" aria-label={ariaLabel}>
        <svg viewBox="0 0 36 36" width="100%" height="100%" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
          <path d={TRACK_PATH} fill="none" stroke="#e1e3e4" strokeWidth={3} />
          {data.map((slice) => {
            const dashOffset = -offset;
            offset += slice.value;
            return (
              <path
                key={slice.label}
                d={TRACK_PATH}
                fill="none"
                stroke={slice.color}
                strokeWidth={3}
                strokeDasharray={`${slice.value}, 100`}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="overline" color="text.secondary">
            {centerLabel}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: fonts.mono }}>
            {centerValue}
          </Typography>
        </Box>
      </Box>

      <Box
        component="ul"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.5,
          width: "100%",
          listStyle: "none",
          m: 0,
          p: 0,
        }}
      >
        {data.map((slice) => (
          <Box component="li" key={slice.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: slice.color, flexShrink: 0 }} aria-hidden="true" />
            <Typography variant="overline" color="text.secondary" noWrap>
              {slice.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default DonutChart;
