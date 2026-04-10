
'use client';

import { createContext, useContext, useState } from 'react';

interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string | null;
}

interface AuthSession {
  user: AuthUser;
}

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ user: AuthUser | null; session: AuthSession | null }>;
  signIn: (email: string, password: string) => Promise<{ user: AuthUser; session: AuthSession }>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
  isEmailVerified: () => boolean;
  getUserProfile: () => Promise<Record<string, unknown> | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Simple local auth - replace with your preferred auth provider later
const ADMIN_EMAIL = 'admin@jpizzabar.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading] = useState(false);

  const signUp = async (email: string, _password: string) => {
    const newUser: AuthUser = { id: '1', email, email_confirmed_at: new Date().toISOString() };
    setUser(newUser);
    const newSession: AuthSession = { user: newUser };
    setSession(newSession);
    return { user: newUser, session: newSession };
  };

  const signIn = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: AuthUser = { id: '1', email, email_confirmed_at: new Date().toISOString() };
      setUser(adminUser);
      const adminSession: AuthSession = { user: adminUser };
      setSession(adminSession);
      return { user: adminUser, session: adminSession };
    }
    throw new Error('Invalid email or password');
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  const getCurrentUser = async () => user;

  const isEmailVerified = () => user?.email_confirmed_at != null;

  const getUserProfile = async () => {
    if (!user) return null;
    return { id: user.id, email: user.email };
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isEmailVerified,
    getUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
