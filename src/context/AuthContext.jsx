import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@clinicalai.com' && password === 'admin123') {
        const adminUser = { 
          id: 'admin-1', 
          name: 'Admin User', 
          email: 'admin@clinicalai.com',
          role: 'admin' 
        };
        setUser(adminUser);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};