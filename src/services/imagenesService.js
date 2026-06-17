import { apiRequest } from './apiClient';

export const getImagenById = (id) => apiRequest(`/imagenes/${id}`);

export const uploadImagen = (archivo, productoId) => {
  const formData = new FormData();
  formData.append('archivo', archivo);
  formData.append('productoId', productoId);
  return apiRequest('/imagenes', { method: 'POST', body: formData, auth: true });
};
