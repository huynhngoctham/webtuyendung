import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (token && userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser); 
        setIsAuthenticated(true); 
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout(); 
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); 
  }, []);

  const login = (userData, token) => {
    try {
      localStorage.setItem('token', token); 
      localStorage.setItem('user', JSON.stringify(userData)); 
      setUser(userData); 
      setIsAuthenticated(true); 
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
