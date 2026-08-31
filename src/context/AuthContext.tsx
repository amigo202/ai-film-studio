import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'director';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ADMIN_CREDENTIALS = {
  email: 'amigosy@gmail.com',
  password: '193512345'
};

const LOCAL_AUTH_KEY = 'ai_film_studio_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'director'
            });
          }
        } else {
          // Dev local session check
          const saved = localStorage.getItem(LOCAL_AUTH_KEY);
          if (saved) {
            setUser(JSON.parse(saved));
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) return { error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            role: 'director'
          });
          return {};
        }
      } else {
        // Local Studio Authentication with configured admin credentials
        const cleanEmail = email.trim().toLowerCase();
        if (
          (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) ||
          (cleanEmail === 'director@studio.ai' && password.length >= 4)
        ) {
          const loggedUser: User = {
            id: 'director-001',
            email: cleanEmail,
            role: 'director'
          };
          setUser(loggedUser);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(loggedUser));
          return {};
        } else {
          return { error: 'אימייל או סיסמה שגויים' };
        }
      }
      return { error: 'ההתחברות נכשלה' };
    } catch (err: any) {
      return { error: err.message || 'שגיאה בהתחברות למערכת' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: Boolean(user) }}>
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
