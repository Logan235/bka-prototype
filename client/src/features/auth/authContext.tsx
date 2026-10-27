import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../../types';
import { MOCK_USERS } from '../../services/mockData';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('bka_user_role') as UserRole;
      if (saved && MOCK_USERS[saved]) return saved;
    } catch {
      // ignore
    }
    return 'student';
  });

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    try {
      localStorage.setItem('bka_user_role', role);
    } catch {
      // ignore
    }
  };

  const currentUser = MOCK_USERS[currentRole] || MOCK_USERS.student;

  return (
    <AuthContext.Provider value={{ currentUser, currentRole, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
