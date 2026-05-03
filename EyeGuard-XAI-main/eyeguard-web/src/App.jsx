import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import UserDashboard from './pages/UserDashboard';
import DoctorScanResult from './pages/DoctorScanResult';
import UserScanResult from './pages/UserScanResult';
import DoctorHistory from './pages/DoctorHistory';
import DoctorRetinalScans from './pages/DoctorRetinalScans';
import Screening from './pages/Screening';
import ChatBot from './pages/ChatBot';
import About from './pages/About';

// Components
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';

// Route Protectors
const ProtectedDoctorRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'doctor') return <Navigate to="/dashboard/user" />;
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'user') return <Navigate to="/dashboard/doctor" />;
  return children;
};

// Wrapper for public pages that just need the Navbar
const PublicLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      {children}
    </div>
  );
};

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      
      {/* Doctor & Shared Protected Routes */}
      <Route 
        path="/dashboard/doctor" 
        element={
          <ProtectedDoctorRoute>
            <DashboardLayout>
              <DoctorDashboard />
            </DashboardLayout>
          </ProtectedDoctorRoute>
        } 
      />
      <Route 
        path="/doctor/history" 
        element={
          <ProtectedDoctorRoute>
            <DashboardLayout>
              <DoctorHistory />
            </DashboardLayout>
          </ProtectedDoctorRoute>
        } 
      />
      <Route 
        path="/doctor/scans" 
        element={
          <ProtectedDoctorRoute>
            <DashboardLayout>
              <DoctorRetinalScans />
            </DashboardLayout>
          </ProtectedDoctorRoute>
        } 
      />
      <Route 
        path="/screening" 
        element={
          <DashboardLayout>
            <Screening />
          </DashboardLayout>
        } 
      />
      <Route 
        path="/scan/:id" 
        element={
          <ProtectedDoctorRoute>
            <DashboardLayout>
              <DoctorScanResult />
            </DashboardLayout>
          </ProtectedDoctorRoute>
        } 
      />

      {/* User Routes */}
      <Route 
        path="/dashboard/user" 
        element={
          <ProtectedUserRoute>
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          </ProtectedUserRoute>
        } 
      />
      <Route 
        path="/scan-result/:id" 
        element={
          <ProtectedUserRoute>
            <DashboardLayout>
              <UserScanResult />
            </DashboardLayout>
          </ProtectedUserRoute>
        } 
      />
      <Route 
        path="/chatbot" 
        element={
          <ProtectedUserRoute>
            <DashboardLayout>
              <ChatBot />
            </DashboardLayout>
          </ProtectedUserRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
