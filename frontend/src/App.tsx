/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { UkCooperationPage } from './pages/UkCooperationPage';
import { PartnersPage } from './pages/PartnersPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { VerifyPage } from './pages/VerifyPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Automatically scroll to top on every route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Protected Admin Dashboard Route
const ProtectedAdminRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminDashboard />;
};

// Dedicated Admin Login Route
const AdminLoginRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <LoginPage />;
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAdminDashboard =
    location.pathname.startsWith('/admin') &&
    location.pathname !== '/admin/login' &&
    isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-250 selection:bg-[#C9A34A]/30 selection:text-current">
      <ScrollToTop />

      {/* Global Institutional Navbar */}
      <div className="no-print">
        <Navbar />
      </div>

      {/* Main Page Content with smooth transition */}
      <main className="flex-1 page-transition">
        <Routes>
          {/* PAGE 1 — HOME */}
          <Route path="/" element={<HomePage />} />

          {/* PAGE 2 — ABOUT US */}
          <Route path="/about" element={<AboutPage />} />

          {/* PAGE 3 — SERVICES */}
          <Route path="/services" element={<ServicesPage />} />

          {/* PAGE 4 — UK COOPERATION */}
          <Route path="/uk-cooperation" element={<UkCooperationPage />} />

          {/* PAGE 5 — ACCREDITED CERTIFICATES */}
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/id-card" element={<Navigate to="/certificates" replace />} />
          <Route path="/id-cards" element={<Navigate to="/certificates" replace />} />

          {/* PAGE 6 — CERTIFICATE VERIFICATION */}
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/verify/certificate/:token" element={<VerifyPage />} />

          {/* PAGE 7 — PARTNERS */}
          <Route path="/partners" element={<PartnersPage />} />

          {/* PAGE 8 — CONTACT US */}
          <Route path="/contact" element={<ContactPage />} />

          {/* PAGE 9 — ADMIN LOGIN & DASHBOARD */}
          <Route path="/admin/login" element={<AdminLoginRoute />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Institutional Footer (hidden on active admin dashboard or print) */}
      {!isAdminDashboard && (
        <div className="no-print">
          <Footer />
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppLayout />
    </BrowserRouter>
  );
};
