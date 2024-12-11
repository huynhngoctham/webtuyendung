const PrivateRoute = ({ children }) => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    return <div>Đang kiểm tra trạng thái đăng nhập...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  // Điều hướng đến đúng trang login
  const redirectTo = userType === "employer" ? "/employer/login" : "/jobseeker/login";
  return <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
