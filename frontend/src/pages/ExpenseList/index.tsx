import { useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import SegmentedControl from "../../components/shared/SegmentedControl";
import { allExpenses } from "../../mocks/financialData";
import type { ExpenseType } from "../../types";
import { colors, fonts } from "../../theme/tokens";
import { formatCurrency, formatDate } from "../../utils/format";

type TypeFilter = "todas" | ExpenseType;

const TYPE_FILTER_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pessoal", label: "Pessoal" },
  { value: "empresa", label: "Empresa" },
];

const PAGE_SIZE = 6;

function ExpenseList() {
  // Estado de UI (busca, filtro, paginação). Quando a API existir, `search`
  // e `typeFilter` viram variáveis de uma query GraphQL paginada em vez de
  // filtrarem o array local — ver TODO(API) abaixo.
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("todas");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // TODO(API): substituir este filtro client-side por
  // useQuery(GET_EXPENSES, { variables: { search, type: typeFilter, offset, limit } })
  // apontando para a API GraphQL (ver src/graphql/client.ts). O ideal é
  // debouncar `search` antes de disparar a query.
  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allExpenses.filter((expense) => {
      const matchesType = typeFilter === "todas" || expense.type === typeFilter;
      const matchesSearch =
        query.length === 0 ||
        expense.description.toLowerCase().includes(query) ||
        expense.categoryLabel.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });
  }, [search, typeFilter]);

  const visibleExpenses = filteredExpenses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExpenses.length;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Despesas
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2} sx={{ mb: 4 }}>
        <TextField
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          type="search"
          placeholder="Buscar transações..."
          aria-label="Buscar transações"
          fullWidth
          sx={{ maxWidth: { md: 360 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <SegmentedControl
          value={typeFilter}
          onChange={(value) => {
            setTypeFilter(value);
            setVisibleCount(PAGE_SIZE);
          }}
          options={TYPE_FILTER_OPTIONS}
          ariaLabel="Filtrar por tipo"
        />
      </Stack>

      <Card sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
            px: 3,
            py: 1.5,
            bgcolor: colors.surfaceContainerLow,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {["Data", "Descrição", "Categoria", "Tipo", "Valor"].map((label, index) => (
            <Typography key={label} variant="overline" color="text.secondary" align={index === 4 ? "right" : "left"}>
              {label}
            </Typography>
          ))}
        </Box>

        {visibleExpenses.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">Nenhuma despesa encontrada para esse filtro.</Typography>
          </Box>
        ) : (
          visibleExpenses.map((expense) => (
            <Box
              key={expense.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr auto", md: "1fr 2fr 1fr 1fr 1fr" },
                alignItems: "center",
                px: 3,
                py: 2.5,
                gap: 0.5,
                borderBottom: 1,
                borderColor: "divider",
                "&:last-of-type": { borderBottom: 0 },
                "&:hover": { bgcolor: colors.surfaceContainerLow },
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: fonts.mono, color: "text.secondary", order: { xs: 1, md: 0 } }}>
                {formatDate(expense.date)}
              </Typography>

              <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" }, order: { xs: 3, md: 0 } }}>
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  {expense.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "block", md: "none" } }}>
                  {expense.categoryLabel} • {expense.type === "pessoal" ? "Pessoal" : "Empresa"}
                </Typography>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Box
                  component="span"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 999,
                    bgcolor: colors.surfaceContainerHigh,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "text.secondary",
                  }}
                >
                  {expense.categoryLabel}
                </Box>
              </Box>

              <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: expense.type === "pessoal" ? "primary.main" : colors.outline,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: expense.type === "pessoal" ? "primary.main" : "text.secondary" }}>
                  {expense.type === "pessoal" ? "Pessoal" : "Empresa"}
                </Typography>
              </Stack>

              <Typography
                variant="subtitle1"
                align="right"
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: 16,
                  order: { xs: 2, md: 0 },
                  color: expense.kind === "entrada" ? "secondary.main" : "text.primary",
                }}
              >
                {expense.kind === "entrada" ? "+" : "−"}
                {formatCurrency(expense.amount)}
              </Typography>
            </Box>
          ))
        )}

        {hasMore && (
          <Box sx={{ py: 4, display: "flex", justifyContent: "center", bgcolor: colors.surfaceContainerLowest }}>
            <Button
              variant="outlined"
              endIcon={<ExpandMoreIcon />}
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              sx={{ borderColor: "divider", color: "text.primary" }}
            >
              Carregar mais transações
            </Button>
          </Box>
        )}
      </Card>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Exibindo {visibleExpenses.length} de {filteredExpenses.length} transações
        </Typography>
      </Stack>
    </Box>
  );
}

export default ExpenseList;
