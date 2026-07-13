import { useState } from "react";
import { Link } from "react-router-dom";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import DonutChart from "../../components/charts/DonutChart";
import SegmentedControl from "../../components/shared/SegmentedControl";
import {
  dashboardCategorySlices,
  dashboardCategoryTotalLabel,
  monthlySummary,
  recentTransactions,
} from "../../mocks/financialData";
import { colors, fonts } from "../../theme/tokens";
import { formatCurrency, formatDate } from "../../utils/format";
import { getCategoryIcon } from "../../utils/categoryIcon";

type Period = "mes-atual" | "mes-passado" | "anual";

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "mes-atual", label: "Este mês" },
  { value: "mes-passado", label: "Mês passado" },
  { value: "anual", label: "Anual" },
];

function Dashboard() {
  // Estado de UI local — não é dado de servidor, então fica em useState
  // mesmo depois de a API existir. Quando a query real entrar, `period`
  // vira uma variável da query (useQuery(GET_DASHBOARD, { variables: { period } })).
  const [period, setPeriod] = useState<Period>("mes-atual");

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "flex-end" }}
        spacing={2}
        sx={{ mb: 4 }}
        className="animate-fade-in"
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            Visão geral
          </Typography>
          <Typography variant="h1" sx={{ mt: 0.5 }}>
            Bem-vindo de volta, Pedro
          </Typography>
        </Box>

        <SegmentedControl value={period} onChange={setPeriod} options={PERIOD_OPTIONS} ariaLabel="Filtro de período" />
      </Stack>

      {/* TODO(API): dados desta seção vêm de uma query agregada por período,
          ex.: useQuery(GET_DASHBOARD_SUMMARY, { variables: { period } }) —
          ver src/graphql/client.ts. Por ora: src/mocks/financialData.ts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          gap: 3,
          mb: 5,
        }}
        className="animate-fade-in"
      >
        <Card
          sx={{
            gridColumn: { md: "span 6" },
            bgcolor: "primary.main",
            color: "primary.contrastText",
            border: "none",
            p: 4,
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Saldo total
            </Typography>
            <Typography variant="h1" sx={{ fontFamily: fonts.mono, mt: 1 }}>
              {formatCurrency(monthlySummary.balance)}
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ position: "relative", zIndex: 1 }}>
            <TrendingUpIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontFamily: fonts.mono }}>
              +{monthlySummary.balanceTrendPct.toLocaleString("pt-BR")}% em relação ao mês anterior
            </Typography>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              right: -48,
              bottom: -48,
              width: 192,
              height: 192,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
              filter: "blur(48px)",
            }}
            aria-hidden="true"
          />
        </Card>

        <Card sx={{ gridColumn: { md: "span 3" }, p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Pessoal
              </Typography>
              <PersonOutlinedIcon sx={{ color: "text.secondary" }} fontSize="small" />
            </Stack>
            <Typography variant="subtitle1" sx={{ fontFamily: fonts.mono, fontSize: 20 }}>
              {formatCurrency(monthlySummary.personalTotal)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={monthlySummary.personalBudgetPct}
            aria-label="Orçamento pessoal utilizado"
            sx={{ mt: 2, height: 4, borderRadius: 999, bgcolor: colors.surfaceContainer }}
          />
        </Card>

        <Card sx={{ gridColumn: { md: "span 3" }, p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Empresa
              </Typography>
              <BusinessCenterOutlinedIcon sx={{ color: "text.secondary" }} fontSize="small" />
            </Stack>
            <Typography variant="subtitle1" sx={{ fontFamily: fonts.mono, fontSize: 20 }}>
              {formatCurrency(monthlySummary.businessTotal)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={monthlySummary.businessBudgetPct}
            color="secondary"
            aria-label="Orçamento da empresa utilizado"
            sx={{ mt: 2, height: 4, borderRadius: 999, bgcolor: colors.surfaceContainer }}
          />
        </Card>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 4 }}>
        <Box className="animate-fade-in">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Transações recentes</Typography>
            <Typography component={Link} to="/despesas" variant="overline" sx={{ color: "primary.main", textDecoration: "none" }}>
              Ver todas
            </Typography>
          </Stack>

          <TableContainer component={Card} sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: colors.surfaceContainerLow }}>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Estabelecimento</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Categoria</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" color="text.secondary">Data</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" color="text.secondary">Valor</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: transaction.kind === "entrada" ? "rgba(0,108,73,0.1)" : colors.surfaceContainerHighest,
                            color: transaction.kind === "entrada" ? "secondary.main" : "text.secondary",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {getCategoryIcon(transaction.categoryLabel)}
                        </Box>
                        <Typography variant="body1">{transaction.description}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 999,
                          bgcolor: transaction.kind === "entrada" ? "rgba(0,108,73,0.15)" : colors.surfaceContainerHigh,
                          color: transaction.kind === "entrada" ? "secondary.main" : "text.secondary",
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {transaction.categoryLabel}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: fonts.mono, color: "text.secondary" }}>
                        {formatDate(transaction.date)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: fonts.mono,
                          fontWeight: 700,
                          color: transaction.kind === "entrada" ? "secondary.main" : "text.primary",
                        }}
                      >
                        {transaction.kind === "entrada" ? "+" : "−"}
                        {formatCurrency(transaction.amount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Stack spacing={4} className="animate-fade-in">
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Gastos por categoria
            </Typography>
            <Card sx={{ p: 3, display: "flex", justifyContent: "center" }}>
              <DonutChart data={dashboardCategorySlices} centerLabel="Total" centerValue={dashboardCategoryTotalLabel} />
            </Card>
          </Box>

          <Card
            component={Link}
            to="/relatorios"
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: colors.surfaceContainerHigh,
              textDecoration: "none",
              "&:hover": { bgcolor: colors.surfaceContainerHighest },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "background.paper",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AnalyticsOutlinedIcon sx={{ color: "primary.main" }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                Relatório do mês disponível
              </Typography>
              <Typography variant="overline" color="text.secondary">
                Ver análise completa
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default Dashboard;
