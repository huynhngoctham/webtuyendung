import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user ? children : <Navigate to="/jobseeker/login" replace />;
};

export default PrivateRoute;
