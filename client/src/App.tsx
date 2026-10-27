import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './features/landing/LandingPage';
import { FundPage } from './features/fund/FundPage';
import { TutorPage } from './features/tutor/TutorPage';
import { AdminPage } from './features/admin/AdminPage';
import { AuthProvider } from './features/auth/authContext';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/fund" element={<FundPage />} />
            <Route path="/tutor" element={<TutorPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
