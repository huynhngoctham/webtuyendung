import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';

import Dashboard from './components/admin/Dashboard'; // Correct import for Admin Dashboard
import AdminLogin from './components/auth/AdminLogin';  // AdminLogin component

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

import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

const Layout = ({ children }) => (
  <div className="d-flex">
    <Sidebar />
    <div className="content-wrapper">{children}</div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  return (
    <Router>
      <Header />
      <Routes>
        {/* User pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/account" element={<AccountPage />} />

        {/* Home and Job pages */}
        <Route path="/" element={<Home />} />
        <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
        <Route path="/jobseeker/register" element={<JobSeekerRegister />} />

        <Route path="/Employer/login" element={<EmployerLogin />} />
        <Route path="/Employer/register" element={<EmployerRegister />} />

        <Route path="/job/:jobId" element={<JobDetail />} />
        <Route path="/applied-jobs" element={<AppliedJobsPage />} />
        <Route path="/jobs/saved" element={<NotificationsPage />} />
        <Route path="/jobs/pending" element={<PendingJobCardsPage />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />

        {/* Admin Routes */}
        {/* Admin login page */}
        <Route 
          path="/admin/login" 
          element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* Admin Dashboard, only accessible when authenticated */}
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin/login" />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
