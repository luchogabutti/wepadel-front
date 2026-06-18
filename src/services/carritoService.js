import { apiRequest } from './apiClient';

const base = (usuarioId) => `/usuarios/${usuarioId}/carrito`;

export const getCarrito = (usuarioId) => apiRequest(base(usuarioId), { auth: true });

export const addItem = (usuarioId, productoId, cantidad = 1) =>
  apiRequest(`${base(usuarioId)}/items`, {
    method: 'POST',
    body: { productoId, cantidad },
    auth: true,
  });

export const updateItem = (usuarioId, productoId, cantidad) =>
  apiRequest(`${base(usuarioId)}/items/${productoId}`, {
    method: 'PUT',
    body: { productoId, cantidad },
    auth: true,
  });

export const removeItem = (usuarioId, productoId) =>
  apiRequest(`${base(usuarioId)}/items/${productoId}`, {
    method: 'DELETE',
    auth: true,
  });

export const vaciarCarrito = (usuarioId) =>
  apiRequest(base(usuarioId), { method: 'DELETE', auth: true });
