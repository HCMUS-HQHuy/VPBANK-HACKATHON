import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './dashboard/Page';
import JarsManagementPage from './jars/Page';
import Navbar from "./common/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jars" element={<JarsManagementPage />} />
        {/* <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/ai-coach" element={<AiCoachPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
