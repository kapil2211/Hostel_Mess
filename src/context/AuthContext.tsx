'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userToken='));

    if (cookie) {
      try {
        const token = cookie.split('=')[1];
        const decoded = JSON.parse(atob(token));
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    document.cookie = 'userToken=; Max-Age=0; path=/';
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
