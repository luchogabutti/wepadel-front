import { createContext, useContext, useState, useCallback } from 'react';
import { AUTH_STORAGE_KEY, getStoredAuth } from '../services/apiClient';
import { login as loginRequest, register as registerRequest } from '../services/authService';

const AuthContext = createContext(null);

const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

const getActiveStorage = () =>
  localStorage.getItem(AUTH_STORAGE_KEY) ? localStorage : sessionStorage;

const mapAuthResponse = (data) => ({
  id: data.id,
  nombreApellido: data.nombreApellido,
  mail: data.mail,
  rol: data.rol,
  token: data.access_token,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredAuth);

  const persist = useCallback((session, remember = false) => {
    setUser(session);
    clearAuthStorage();
    if (!session) return;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }, []);

  const login = useCallback(
    async ({ email, password, remember = false }) => {
      const session = mapAuthResponse(await loginRequest({ email, password }));
      persist(session, remember);
      return session;
    },
    [persist]
  );

  const register = useCallback(
    async (datos) => {
      const session = mapAuthResponse(await registerRequest(datos));
      persist(session, true);
      return session;
    },
    [persist]
  );

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const updateUser = useCallback(
    (cambios) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...cambios };
        getActiveStorage().setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const value = {
    user,
    isAuthenticated: Boolean(user?.token),
    isAdmin: user?.rol === 'ADMINISTRADOR',
    login,
    register,
    logout,
    updateUser,
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
