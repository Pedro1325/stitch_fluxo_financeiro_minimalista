import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/** Título mostrado no header compacto, por rota. */
const TASK_TITLES: Record<string, string> = {
  "/nova-despesa": "Nova despesa",
};

/**
 * Shell "tarefa": header compacto com botão de voltar, sem navegação nem
 * FAB — menos distração para o usuário concentrar no formulário.
 */
function TaskLayout() {
  const { pathname } = useLocation();
  const title = TASK_TITLES[pathname] ?? "";

  return (
    <Box sx={{ minHeight: "100vh", pb: 12 }}>
      <AppBar position="sticky" color="inherit" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", gap: 1 }}>
          <IconButton component={Link} to="/" aria-label="Voltar" edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ maxWidth: 640, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default TaskLayout;
