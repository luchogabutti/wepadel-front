import { apiRequest } from './apiClient';

export const getPuntos = (usuarioId) =>
  apiRequest(`/usuarios/${usuarioId}/puntos`, { auth: true });
