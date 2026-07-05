import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function AppLayout() {
  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FinanceFlow
          </Typography>
          <Button component={Link} to="/">
            Dashboard
          </Button>
          <Button component={Link} to="/despesas">
            Despesas
          </Button>
          <Button component={Link} to="/relatorios">
            Relatórios
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ py: 4 }}>
        {/* O React Router encaixa aqui a página filha da rota atual */}
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayout;
