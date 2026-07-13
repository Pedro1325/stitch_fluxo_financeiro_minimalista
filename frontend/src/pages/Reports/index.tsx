import { useState } from "react";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import BarChart from "../../components/charts/BarChart";
import SegmentedControl from "../../components/shared/SegmentedControl";
import {
  reportBudgetUsedPct,
  reportCategoryBreakdown,
  reportForecastNextMonth,
  reportTotalOutflow,
  reportTrendVsPreviousMonthPct,
} from "../../mocks/financialData";
import { colors, fonts } from "../../theme/tokens";
import { formatCurrency } from "../../utils/format";
import { getCategoryIcon } from "../../utils/categoryIcon";

type ReportPeriod = "mensal" | "anual";

const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: "mensal", label: "Mensal" },
  { value: "anual", label: "Anual" },
];

function Reports() {
  // Estado de UI local — quando a API existir, vira variável de
  // useQuery(GET_REPORT, { variables: { period } }).
  const [period, setPeriod] = useState<ReportPeriod>("mensal");

  const barChartData = reportCategoryBreakdown.map((row) => ({ label: row.name.split(" ")[0], value: row.amount }));

  return (
    <Box sx={{ pb: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "flex-end" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h1" sx={{ mb: 1 }}>
            Análise de gastos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualize seus padrões de gasto por categoria.
          </Typography>
        </Box>

        <SegmentedControl value={period} onChange={setPeriod} options={PERIOD_OPTIONS} ariaLabel="Período do relatório" />
      </Stack>

      {/* TODO(API): useQuery(GET_REPORT, { variables: { period } }) — ver
          src/graphql/client.ts. Por ora: src/mocks/financialData.ts */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" }, gap: 3 }}>
        <Card sx={{ gridColumn: { lg: "span 8" }, p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="subtitle1">Comparativo de gastos</Typography>
              <Typography variant="body2" color="text.secondary">
                Alocação por categoria no período atual
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "secondary.main" }}>
              <TrendingDownIcon fontSize="small" />
              <Typography variant="body2" sx={{ fontFamily: fonts.mono }}>
                {reportTrendVsPreviousMonthPct.toLocaleString("pt-BR")}% vs mês anterior
              </Typography>
            </Stack>
          </Stack>

          <BarChart data={barChartData} formatValue={formatCurrency} />
        </Card>

        <Stack sx={{ gridColumn: { lg: "span 4" } }} spacing={3}>
          <Card
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              border: "none",
              p: 4,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Saída total
              </Typography>
              <Typography variant="h1" sx={{ fontFamily: fonts.mono, mt: 1 }}>
                {formatCurrency(reportTotalOutflow)}
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">Orçamento mensal</Typography>
                <Typography variant="body2" sx={{ fontFamily: fonts.mono }}>
                  {reportBudgetUsedPct}% usado
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={reportBudgetUsedPct}
                aria-label="Orçamento mensal utilizado"
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": { bgcolor: "secondary.light", borderRadius: 999 },
                }}
              />
            </Box>
          </Card>

          <Card sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Previsão próximo mês
              </Typography>
              <Typography variant="subtitle1" sx={{ fontFamily: fonts.mono, color: "primary.main" }}>
                {formatCurrency(reportForecastNextMonth)}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(0,74,198,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoGraphOutlinedIcon sx={{ color: "primary.main" }} />
            </Box>
          </Card>
        </Stack>

        <Card sx={{ gridColumn: "1 / -1", overflow: "hidden" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider", bgcolor: colors.surfaceContainerLowest }}
          >
            <Typography variant="subtitle1">Detalhamento por categoria</Typography>
            <Button size="small" startIcon={<FilterListIcon fontSize="small" />} sx={{ color: "text.secondary" }}>
              Ordenar por valor
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: colors.surfaceContainerLow }}>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Categoria</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Valor</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" color="text.secondary">Alocação</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportCategoryBreakdown.map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            bgcolor: row.status === "no-orcamento" ? "rgba(0,74,198,0.1)" : colors.errorContainer,
                            color: row.status === "no-orcamento" ? "primary.main" : "error.main",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {getCategoryIcon(row.name)}
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status === "no-orcamento" ? "No orçamento" : "Acima do orçamento"}
                        size="small"
                        sx={{
                          bgcolor: row.status === "no-orcamento" ? colors.secondaryContainer : colors.errorContainer,
                          color: row.status === "no-orcamento" ? colors.onSecondaryContainer : colors.onErrorContainer,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: fonts.mono }}>
                        {formatCurrency(row.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1.5}>
                        <Box sx={{ width: 96 }}>
                          <LinearProgress
                            variant="determinate"
                            value={row.allocationPct}
                            aria-label={`Participação de ${row.name} no total`}
                            sx={{ height: 6, borderRadius: 999, bgcolor: colors.surfaceContainerHigh }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ fontFamily: fonts.mono, width: 36 }}>
                          {row.allocationPct}%
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* TODO(API): sem endpoint de exportação ainda — plugar quando a API
            expuser algo como GET /relatorios/{periodo}/pdf ou uma mutation
            GraphQL que devolva a URL do arquivo gerado. */}
        <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<PictureAsPdfOutlinedIcon />}
            sx={{
              bgcolor: colors.inverseSurface,
              color: colors.inverseOnSurface,
              borderRadius: 999,
              px: 4,
              "&:hover": { bgcolor: "#191c1d" },
            }}
          >
            Exportar relatório em PDF
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
