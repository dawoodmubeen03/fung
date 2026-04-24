import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-brand">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="text-white mt-4 font-semibold">Loading...</p>
      </div>
    </div>
  );
}

// Protected Route Component
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Public Route that redirects to dashboard if already logged in
export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Lazy loading component wrapper
export function LazyComponent({ Component }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
}

// Lazy load pages
export const LandingPage = lazy(() => import('../pages/LandingPage'));
export const LoginPage = lazy(() => import('../pages/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/RegisterPage'));
export const DashboardPage = lazy(() => import('../pages/DashboardPage'));
export const UniversitiesPage = lazy(() => import('../pages/UniversitiesPage'));
export const UniversityDetailPage = lazy(() => import('../pages/UniversityDetailPage'));
export const CalculatorPage = lazy(() => import('../pages/CalculatorPage'));
export const ResourcesPage = lazy(() => import('../pages/ResourcesPage'));
export const TestDetailPage = lazy(() => import('../pages/TestDetailPage'));
export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
