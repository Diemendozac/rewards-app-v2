'use client'
import { CustomerUser } from '@/interfaces/CustomerUser';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';


interface AuthContextType {
  user: CustomerUser | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí puedes implementar la lógica para verificar y decodificar el token
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      setLoading(true);
      // Llama a la API para obtener la información del usuario usando el token
      const response = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const login = async (usernameOrEmail: string, password: string) => {
    
    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameOrEmail, password })
      });
      if (!response.ok) throw new Error('Invalid login credentials');
      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false);
      router.push('/dashboard'); // Redirige al usuario a la página de inicio después del login
    } catch (e) {
      setError('');
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
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