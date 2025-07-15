import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@/styles/index.css";
import App from '@/App.jsx';
import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx'; // <-- IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider> {/* <-- BỌC Ở ĐÂY */}
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);