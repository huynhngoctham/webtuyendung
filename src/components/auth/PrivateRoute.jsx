import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Chờ quá trình xác thực hoàn tất
  if (loading) {
    return <div>Đang kiểm tra trạng thái đăng nhập...</div>;
  }

  // Kiểm tra nếu người dùng đã đăng nhập và có thông tin người dùng hợp lệ
  if (isAuthenticated && user) {
    // Kiểm tra vai trò người dùng (nếu có yêu cầu vai trò cụ thể)
    if (requiredRole && user.role !== requiredRole) {
      // Nếu vai trò không đúng, chuyển hướng đến trang phù hợp (chẳng hạn trang home)
      return <Navigate to="/" replace />;
    }

    return children;
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang login đúng dựa trên vai trò của người dùng
  const redirectTo = user?.role === 'admin' ? '/admin/login' :
                     user?.role === 'employer' ? '/employer/login' :
                     '/jobseeker/login'; // Giả sử nếu không phải admin hoặc employer thì là job seeker

  return <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
