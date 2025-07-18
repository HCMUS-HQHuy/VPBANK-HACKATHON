import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout"; 
import AuthLayout from "./components/layout/AuthLayout";

import DashboardPage from './pages/DashboardPage';
import JarsManagementPage from './pages/JarsManagementPage';
import AiCoachPage from './pages/AICoachPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="jars" element={<JarsManagementPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="ai-coach" element={<AiCoachPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  )
}
