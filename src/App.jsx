import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import AboutSection from './pages/AboutSection';
import Map from './pages/Map';
import Header from './pages/Header';
import HeaderHero from './pages/HeaderHero';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// User Pages
import Dashboard from './pages/User/Dashboard';
import Records from './pages/User/Records';
import Prescription from './pages/User/Prescription';
import Profile from './pages/User/Profile';
import NewAppointment from './pages/Appointments/NewAppointment';
import ViewAppointments from './pages/Appointments/ViewAppointments';

// Doctor Pages (placeholder - to be implemented)
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorPatients from './pages/Doctor/Patients';
import DoctorDiagnose from './pages/Doctor/Diagnose';
import DiagnosisSummary from './pages/Doctor/DiagnosisSummary';

// Admin Pages (placeholder - to be implemented)
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminDoctors from './pages/Admin/Doctors';

// Shared Pages
import Features from './pages/Feature';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Role-Based Redirect Component
 * 
 * Purpose: Redirects users to their appropriate dashboard based on their role
 */
const RoleBasedRedirect = () => {
  const { getRole, loading } = useAuth();
  
  // Show loading while authentication is being initialized
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const userRole = getRole();

  switch (userRole) {
    case 'admin':
      return <Navigate to="/app/admin/dashboard" replace />;
    case 'doctor':
      return <Navigate to="/app/doctor/dashboard" replace />;
    case 'user':
    default:
      return <Navigate to="/app/dashboard" replace />;
  }
};

/**
 * App Routes Component
 * 
 * Purpose: Contains all the routing logic inside AuthProvider context
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutSection />} />
      <Route path="/map" element={<Map />} />
      {/* Protected Routes with Layout under /app */}
      <Route path="/app" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Default route - redirect based on user role */}
        <Route index element={<RoleBasedRedirect />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="records" element={<Records />} />
        <Route path="records/:id" element={<Records />} />
        <Route path="prescriptions" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="prescriptions/:id" element={<Prescription />} />
        <Route path="profile" element={<Profile />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="appointments" element={<ViewAppointments />} />
        
        {/* Doctor Routes */}
        <Route path="doctor/dashboard" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="doctor/patients" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorPatients />
          </ProtectedRoute>
        } />
        <Route path="doctor/patients/:id" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <Records />
          </ProtectedRoute>
        } />
        <Route path="doctor/diagnose" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDiagnose />
          </ProtectedRoute>
        } />
        <Route path="doctor/diagnose/:patientId" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDiagnose />
          </ProtectedRoute>
        } />
        <Route path="doctor/diagnosis-summary" element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DiagnosisSummary />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="admin/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="admin/users" element={
          <ProtectedRoute roles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="admin/doctors" element={
          <ProtectedRoute roles={['admin']}>
            <AdminDoctors />
          </ProtectedRoute>
        } />
      </Route>

      {/* Legacy path redirects to /app equivalents */}
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/records" element={<Navigate to="/app/records" replace />} />
      <Route path="/records/:id" element={<Navigate to="/app/records/:id" replace />} />
      <Route path="/prescriptions" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/prescriptions/:id" element={<Navigate to="/app/prescriptions/:id" replace />} />
      <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
      <Route path="/doctor/dashboard" element={<Navigate to="/app/doctor/dashboard" replace />} />
      <Route path="/doctor/patients" element={<Navigate to="/app/doctor/patients" replace />} />
      <Route path="/doctor/patients/:id" element={<Navigate to="/app/doctor/patients/:id" replace />} />
      <Route path="/doctor/diagnose" element={<Navigate to="/app/doctor/diagnose" replace />} />
      <Route path="/doctor/diagnose/:patientId" element={<Navigate to="/app/doctor/diagnose/:patientId" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/app/admin/dashboard" replace />} />
      <Route path="/admin/users" element={<Navigate to="/app/admin/users" replace />} />
      <Route path="/admin/doctors" element={<Navigate to="/app/admin/doctors" replace />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/**
 * Main App Component
 * 
 * Purpose: Main application component with routing configuration
 * 
 * Features:
 * - Role-based routing with protected routes
 * - Authentication context provider
 * - Layout wrapper for authenticated routes
 * - Public routes for authentication
 * - 404 handling for invalid routes
 * - Automatic redirects based on user role
 */
function App() {
  // Set test auth token for development
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', 'test-token-123');
    }
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
