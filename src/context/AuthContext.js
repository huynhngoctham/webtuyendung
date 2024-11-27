import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is authenticated
  const [user, setUser] = useState(null); // Store user information
  const [loading, setLoading] = useState(true); // Track if authentication status is being checked

  // Run once on component mount to check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (token && userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser); // Set user information
        setIsAuthenticated(true); // Mark as authenticated
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout(); // Logout if parsing fails
      }
    } else {
      setIsAuthenticated(false); // Mark as unauthenticated
    }
    setLoading(false); // Mark as finished loading
  }, []);

  // Function to log in a user
  const login = (userData, token) => {
    try {
      localStorage.setItem('token', token); // Save token in localStorage
      localStorage.setItem('user', JSON.stringify(userData)); // Save user data
      setUser(userData); // Update state with user data
      setIsAuthenticated(true); // Mark as authenticated
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Function to log out a user
  const logout = () => {
    try {
      localStorage.removeItem('token'); // Remove token
      localStorage.removeItem('user'); // Remove user data
      setUser(null); // Clear user state
      setIsAuthenticated(false); // Mark as unauthenticated
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Provide context to children
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
