import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedControlOption<T>[];
  ariaLabel: string;
}

/** Controle segmentado em formato de pílula, usado nos filtros de período/tipo. */
function SegmentedControl<T extends string>({ value, onChange, options, ariaLabel }: SegmentedControlProps<T>) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_event, next: T | null) => {
        if (next) onChange(next);
      }}
      aria-label={ariaLabel}
      sx={{
        bgcolor: "grey.100",
        borderRadius: 999,
        p: 0.5,
        "& .MuiToggleButtonGroup-grouped": {
          border: 0,
          borderRadius: "999px !important",
          textTransform: "uppercase",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.05em",
          px: 2.5,
          color: "text.secondary",
          "&.Mui-selected": {
            bgcolor: "background.paper",
            color: "primary.main",
            boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
          },
          "&.Mui-selected:hover": {
            bgcolor: "background.paper",
          },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default SegmentedControl;
