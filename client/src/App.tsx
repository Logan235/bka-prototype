import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './features/landing/LandingPage';
import { FundPage } from './features/fund/FundPage';
import { TutorPage } from './features/tutor/TutorPage';
import { AdminPage } from './features/admin/AdminPage';
import { AuthProvider } from './features/auth/authContext';

export function App() {
  const path = window.location.pathname;

  return (
    <AuthProvider>
      <MainLayout>
        {path === '/fund' && <FundPage />}
        {path === '/tutor' && <TutorPage />}
        {path === '/admin' && <AdminPage />}
        {path === '/' && <LandingPage />}
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
