import { apiRequest } from './apiClient';

export const getUsuarioById = (id) => apiRequest(`/usuarios/${id}`, { auth: true });

export const updateUsuario = (id, data) =>
  apiRequest(`/usuarios/${id}`, { method: 'PUT', body: data, auth: true });

export const getUsuarios = () => apiRequest('/usuarios', { auth: true });
