import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import NewExpense from "./pages/NewExpense";
import Reports from "./pages/Reports";

function AppRoutes() {
  return (
    <Routes>
      {/* Sem shell (design: "nenhum") */}
      <Route path="/login" element={<Login />} />

      {/* Com header + navegação (design: "completo") */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/despesas" element={<ExpenseList />} />
        <Route path="/nova-despesa" element={<NewExpense />} />
        <Route path="/relatorios" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
