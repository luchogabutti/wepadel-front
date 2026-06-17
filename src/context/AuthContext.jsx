import { createContext, useContext, useState, useCallback } from 'react';
import { AUTH_STORAGE_KEY } from '../services/apiClient';
import { login as loginRequest, register as registerRequest } from '../services/authService';

const AuthContext = createContext(null);

const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const mapAuthResponse = (data) => ({
  id: data.id,
  nombreApellido: data.nombreApellido,
  mail: data.mail,
  rol: data.rol,
  token: data.access_token,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredAuth);

  const persist = useCallback((session) => {
    setUser(session);
    if (session) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      const session = mapAuthResponse(await loginRequest(credentials));
      persist(session);
      return session;
    },
    [persist]
  );

  const register = useCallback(
    async (datos) => {
      const session = mapAuthResponse(await registerRequest(datos));
      persist(session);
      return session;
    },
    [persist]
  );

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const value = {
    user,
    isAuthenticated: Boolean(user?.token),
    isAdmin: user?.rol === 'ADMINISTRADOR',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
