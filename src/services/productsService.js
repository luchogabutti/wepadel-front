import { apiRequest } from './apiClient';

export const getProducts = () => apiRequest('/productos');

export const getProductoById = (id) => apiRequest(`/productos/${id}`);

export const getImagenesByProductoId = (id) => apiRequest(`/productos/${id}/imagenes`);

export const createProducto = (data) =>
  apiRequest('/productos', { method: 'POST', body: data, auth: true });

export const updateProducto = (id, data) =>
  apiRequest(`/productos/${id}`, { method: 'PUT', body: data, auth: true });

export const deleteProducto = (id) =>
  apiRequest(`/productos/${id}`, { method: 'DELETE', auth: true });

export const buildProductoRequest = (adminProduct, overrides = {}) => ({
  nombre: adminProduct.title ?? adminProduct.name,
  descripcion: adminProduct.description?.trim()
    ? adminProduct.description
    : adminProduct.title ?? adminProduct.name,
  precio: Number(adminProduct.price),
  categoria: (adminProduct.category || adminProduct.categoryId || '').toUpperCase(),
  estaHabilitado: adminProduct.enabled !== false,
  ...overrides,
});
