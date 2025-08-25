import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('cv_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('cv_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      const storedUsers = JSON.parse(localStorage.getItem('cv_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const userData: User = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
        };
        
        localStorage.setItem('cv_user', JSON.stringify(userData));
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would be an API call
      const storedUsers = JSON.parse(localStorage.getItem('cv_users') || '[]');
      
      // Check if user already exists
      if (storedUsers.some((u: any) => u.email === email)) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        fullName,
        email,
        password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('cv_users', JSON.stringify(storedUsers));
      
      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt,
      };
      
      localStorage.setItem('cv_user', JSON.stringify(userData));
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('cv_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};