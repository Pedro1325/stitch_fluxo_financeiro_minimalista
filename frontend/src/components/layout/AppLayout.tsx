import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

/** Fonte única da navegação — usada no header desktop e na barra inferior mobile. */
const NAV_ITEMS = [
  { label: "Início", path: "/", icon: <HomeOutlinedIcon /> },
  { label: "Despesas", path: "/despesas", icon: <PaymentsOutlinedIcon /> },
  { label: "Relatórios", path: "/relatorios", icon: <AnalyticsOutlinedIcon /> },
];

/** Shell "completo": header + navegação (desktop) / barra inferior + FAB (mobile). */
function AppLayout() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 12, md: 0 } }}>
      <AppBar position="sticky" color="inherit" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", gap: 2 }}>
          <Typography
            component={Link}
            to="/"
            variant="h2"
            sx={{ flexGrow: 1, color: "primary.main", textDecoration: "none" }}
          >
            FinanceFlow
          </Typography>

          <Box component="nav" aria-label="Navegação principal" sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {NAV_ITEMS.map((item) => (
              <Typography
                key={item.path}
                component={Link}
                to={item.path}
                variant="overline"
                aria-current={pathname === item.path ? "page" : undefined}
                sx={{
                  textDecoration: "none",
                  color: pathname === item.path ? "primary.main" : "text.secondary",
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <IconButton aria-label="Notificações" color="inherit">
            <NotificationsOutlinedIcon />
          </IconButton>

          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.light", color: "primary.main", fontSize: 14, fontWeight: 700 }}>
            PH
          </Avatar>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ maxWidth: 1280, py: { xs: 3, md: 4 } }}>
        <Outlet />
      </Container>

      <Fab
        component={Link}
        to="/nova-despesa"
        color="primary"
        aria-label="Nova despesa"
        sx={{ position: "fixed", right: 24, bottom: { xs: 88, md: 24 }, zIndex: 1201 }}
      >
        <AddIcon />
      </Fab>

      <BottomNavigation
        value={pathname}
        showLabels
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          borderTop: 1,
          borderColor: "divider",
          zIndex: 1100,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <BottomNavigationAction key={item.path} label={item.label} value={item.path} icon={item.icon} component={Link} to={item.path} />
        ))}
      </BottomNavigation>
    </Box>
  );
}

export default AppLayout;
