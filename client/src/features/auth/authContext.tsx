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
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const currentUser = MOCK_USERS[currentRole];

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentRole, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
