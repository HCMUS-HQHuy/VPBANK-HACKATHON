import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import JarsManagementPage from './pages/JarsManagementPage';
import AiCoachPage from './pages/AICoachPage'; 
import TransactionsPage from './pages/TransactionsPage'; 
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jars" element={<JarsManagementPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/ai-coach" element={<AiCoachPage />} />
      </Routes>
    </BrowserRouter>
  )
}
