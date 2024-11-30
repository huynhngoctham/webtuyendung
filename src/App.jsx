import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthContext

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './components/admin/Dashboard';
import AdminLogin from './components/auth/AdminLogin';
import AdminHeader from './components/layout/AdminHeader';
import FieldManagement from './components/admin/FieldManagement';
import WorkplaceManagement from './components/admin/WorkplaceManagement';
import LanguageManagement from './components/admin/LanguageManagement';
import ItManagement from './components/admin/ItManagement';



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
import EmployerDashboard from './components/employer/EmployerDashboard'; // Ensure correct path
//import PrivateRoute from './components/auth/PrivateRoute'; // Import PrivateRoute

const Layout = ({ children }) => (
  <div className="d-flex">
    <Sidebar />
    <div className="content-wrapper">{children}</div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/jobseeker/login" element={<PublicLayout><JobSeekerLogin /></PublicLayout>} />
          <Route path="/jobseeker/register" element={<PublicLayout><JobSeekerRegister /></PublicLayout>} />
          <Route path="/employer/login" element={<PublicLayout><EmployerLogin /></PublicLayout>} />
          <Route path="/employer/register" element={<PublicLayout><EmployerRegister /></PublicLayout>} />
          <Route path="/job/:jobId" element={<PublicLayout><JobDetail /></PublicLayout>} />
          <Route path="/job-opportunities" element={<PublicLayout><JobOpportunities /></PublicLayout>} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected routes */}
          <Route path="/profile" element={<PrivateLayout><ProfilePage /></PrivateLayout>} />
          <Route path="/user/account" element={<PrivateLayout><AccountPage /></PrivateLayout>} />
          <Route path="/applied-jobs" element={<PrivateLayout><AppliedJobsPage /></PrivateLayout>} />
          <Route path="/jobs/saved" element={<PrivateLayout><NotificationsPage /></PrivateLayout>} />
          <Route path="/jobs/pending" element={<PrivateLayout><PendingJobCardsPage /></PrivateLayout>} />

          {/* Protected employer route */}
          <Route path="/employer/dashboard" element={<PrivateLayout role="employer"><EmployerDashboard /></PrivateLayout>} />

          {/* Protected admin route */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/field-management" element={<FieldManagement />} />
          <Route path="/admin/workplace-management" element={<WorkplaceManagement />} />
          <Route path="/admin/language-management" element={<LanguageManagement />} />
          <Route path="/admin/it-management" element={<ItManagement />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

const PublicLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const PrivateLayout = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();

  // Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/jobseeker/login" replace />;
  }

  // Kiểm tra role, nếu có thì chỉ cho phép người dùng với role tương ứng
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <div className="content-wrapper">{children}</div> {/* Không có Sidebar */}
      <Footer />
    </>
  );
};

const AdminLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // Kiểm tra nếu người dùng chưa đăng nhập hoặc không phải là admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <AdminHeader />
      <div className="content-wrapper">{children}</div> {/* Không có Sidebar */}
    </>
  );
};
