'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (user) {
      const minimalUser = {
        email: user.email,
        name: user.name,
        role: user.role, // Adicionar role aqui
      };
      localStorage.setItem('user', JSON.stringify(minimalUser));
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, [setUser]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as Pick<User, 'email' | 'name' | 'role'>;

          // Aqui você pode consultar no backend para pegar informações atualizadas
          const response = await fetch('/api/auth/session', {
            method: 'POST',
            body: JSON.stringify({ email: parsedUser.email }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Sessão inválida');
          }

          const { user: freshUser } = await response.json();

          // Verifica se a sessão expirou
          if (freshUser.session_expires_at && new Date(freshUser.session_expires_at).getTime() < Date.now()) {
            console.log('Sessão expirada. Fazendo logout.');
            logout();
          } else {
            setUser(freshUser);
          }
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, logout]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
