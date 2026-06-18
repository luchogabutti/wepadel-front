import { apiRequest } from './apiClient';

export const getDescuentosByProducto = (productoId) =>
  apiRequest(`/descuentos/producto/${productoId}`, { auth: true });

export const getDescuentoById = (id) => apiRequest(`/descuentos/${id}`, { auth: true });

export const createDescuento = (data) =>
  apiRequest('/descuentos', { method: 'POST', body: data, auth: true });

export const updateDescuento = (id, data) =>
  apiRequest(`/descuentos/${id}`, { method: 'PUT', body: data, auth: true });

export const deleteDescuento = (id) =>
  apiRequest(`/descuentos/${id}`, { method: 'DELETE', auth: true });
