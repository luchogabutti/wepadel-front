import { apiRequest } from './apiClient';

export const getStockByProducto = (productoId) =>
  apiRequest(`/stocks/producto/${productoId}`, { auth: true });

export const updateStock = (productoId, cantidad) =>
  apiRequest(`/stocks/producto/${productoId}`, {
    method: 'PUT',
    body: { cantidad },
    auth: true,
  });
