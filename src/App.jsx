import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './components/admin/Dashboard';
import AdminLogin from './components/auth/AdminLogin';
import JobSeekerLogin from './components/auth/JobSeekerLogin';
import JobSeekerRegister from './components/auth/JobSeekerRegister';
import EmployerLogin from './components/auth/EmployerLogin';
import EmployerRegister from './components/auth/EmployerRegister';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import AppliedJobsPage from './components/job-management/applied-jobs/AppliedJobsPage';
import NotificationsPage from './components/job-management/job-notifications/NotificationsPage';
import PendingJobCardsPage from './components/job-management/pending-jobs/PendingJobCardsPage';
import JobOpportunities from './components/job/JobOpportunities';

const Layout = ({ children }) => (
  <div className="d-flex">
    <Sidebar />
    <div className="content-wrapper">{children}</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Protected routes for logged-in users */}
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/user/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
          <Route path="/applied-jobs" element={<PrivateRoute><AppliedJobsPage /></PrivateRoute>} />
          <Route path="/jobs/saved" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
          <Route path="/jobs/pending" element={<PrivateRoute><PendingJobCardsPage /></PrivateRoute>} />

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
          <Route path="/jobseeker/register" element={<JobSeekerRegister />} />
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/register" element={<EmployerRegister />} />
          <Route path="/job/:jobId" element={<JobDetail />} />
          <Route path="/job-opportunities" element={<JobOpportunities />} />

          {/* Protected routes for admins */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/jobseeker/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === 'admin' ? children : <Navigate to="/admin/login" replace />;
};

export default App;
