import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  UniversitiesPage,
  UniversityDetailPage,
  CalculatorPage,
  ResourcesPage,
  TestDetailPage,
  NotFoundPage,
  ProtectedRoute,
  PublicRoute,
  LazyComponent,
} from './RouteGuards';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<LazyComponent Component={LandingPage} />} 
        />

        {/* Auth Routes - Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LazyComponent Component={LoginPage} />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <LazyComponent Component={RegisterPage} />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LazyComponent Component={DashboardPage} />
            </ProtectedRoute>
          }
        />

        {/* Universities Routes */}
        <Route
          path="/universities"
          element={<LazyComponent Component={UniversitiesPage} />}
        />

        <Route
          path="/universities/:slug"
          element={<LazyComponent Component={UniversityDetailPage} />}
        />

        {/* Calculator & Resources */}
        <Route
          path="/calculator"
          element={<LazyComponent Component={CalculatorPage} />}
        />

        <Route
          path="/resources"
          element={<LazyComponent Component={ResourcesPage} />}
        />

        <Route
          path="/tests/:slug"
          element={<LazyComponent Component={TestDetailPage} />}
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={<LazyComponent Component={NotFoundPage} />}
        />
      </Routes>
    </Router>
  );
}
