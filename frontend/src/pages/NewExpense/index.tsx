import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import SegmentedControl from "../../components/shared/SegmentedControl";
import type { ExpenseType } from "../../types";
import { fonts } from "../../theme/tokens";

const CATEGORY_OPTIONS = [
  "Alimentação",
  "Mercado",
  "Transporte",
  "Moradia",
  "Saúde",
  "Lazer",
  "Equipamentos",
  "Software e assinaturas",
];

const TYPE_OPTIONS: { value: ExpenseType; label: string }[] = [
  { value: "pessoal", label: "Pessoal" },
  { value: "empresa", label: "Empresa" },
];

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

interface FormState {
  type: ExpenseType;
  amount: string;
  description: string;
  category: string;
  date: string;
  notes: string;
  attachmentName: string | null;
}

interface FormErrors {
  amount?: string;
  description?: string;
  category?: string;
  date?: string;
}

function NewExpense() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    type: "pessoal",
    amount: "",
    description: "",
    category: "",
    date: todayIsoDate(),
    notes: "",
    attachmentName: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    const parsedAmount = Number(form.amount.replace(",", "."));

    if (!form.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Informe um valor válido";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Descrição obrigatória";
    }
    if (!form.category) {
      nextErrors.category = "Selecione uma categoria";
    }
    if (!form.date) {
      nextErrors.date = "Data obrigatória";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    // TODO(API): useMutation(CREATE_EXPENSE, { variables: { input: form } })
    // apontando para a API GraphQL (.NET + HotChocolate) — ver
    // src/graphql/client.ts para o endpoint. Por ora, a despesa não é
    // persistida em lugar nenhum; só voltamos para a lista.
    navigate("/despesas");
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SegmentedControl
          value={form.type}
          onChange={(value) => setForm((prev) => ({ ...prev, type: value }))}
          options={TYPE_OPTIONS}
          ariaLabel="Tipo da despesa"
        />
      </Box>

      <Stack spacing={4}>
        <Box sx={{ textAlign: "center", py: 4, border: 1, borderColor: "divider", borderRadius: 2 }}>
          <Typography component="label" htmlFor="valor" variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            Valor
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="h1" color="text.secondary" sx={{ mr: 1 }} aria-hidden="true">
              R$
            </Typography>
            <TextField
              id="valor"
              name="valor"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              placeholder="0,00"
              slotProps={{ htmlInput: { inputMode: "decimal", "aria-label": "Valor da despesa" } }}
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              variant="standard"
              sx={{
                width: 160,
                "& .MuiInput-input": {
                  textAlign: "center",
                  fontFamily: fonts.mono,
                  fontSize: 36,
                  fontWeight: 700,
                  color: "primary.main",
                },
                "& .MuiInput-root:before, & .MuiInput-root:after": { borderBottom: "none" },
                "& .MuiInput-root:hover:not(.Mui-disabled):before": { borderBottom: "none" },
              }}
            />
          </Stack>
        </Box>

        <TextField
          label="Descrição"
          placeholder="Com o que foi esse gasto?"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          error={Boolean(errors.description)}
          helperText={errors.description}
          fullWidth
          required
        />

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <TextField
            select
            label="Categoria"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            error={Boolean(errors.category)}
            helperText={errors.category}
            fullWidth
            required
          >
            {CATEGORY_OPTIONS.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Data"
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            error={Boolean(errors.date)}
            helperText={errors.date}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
            required
          />
        </Stack>

        <TextField
          label="Observações (opcional)"
          placeholder="Notas ou contexto adicional..."
          value={form.notes}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          multiline
          rows={4}
          fullWidth
        />

        <Box
          component="label"
          htmlFor="comprovante"
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <input
            id="comprovante"
            name="comprovante"
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(event) =>
              setForm((prev) => ({ ...prev, attachmentName: event.target.files?.[0]?.name ?? null }))
            }
          />
          <AttachFileIcon sx={{ color: "text.secondary", mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {form.attachmentName ?? "Anexar comprovante ou nota fiscal (opcional)"}
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          p: 2,
          zIndex: 1100,
        }}
      >
        <Box sx={{ maxWidth: 640, mx: "auto" }}>
          <Button type="submit" variant="contained" fullWidth size="large">
            Salvar despesa
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NewExpense;
