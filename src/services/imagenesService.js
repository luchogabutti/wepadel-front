import { apiRequest } from './apiClient';

export const getImagenById = (id) => apiRequest(`/imagenes/${id}`);

export const uploadImagen = (archivo, productoId) => {
  const formData = new FormData();
  formData.append('archivo', archivo);
  formData.append('productoId', productoId);
  return apiRequest('/imagenes', { method: 'POST', body: formData, auth: true });
};

export const updateImagen = (imagenId, archivo) => {
  const formData = new FormData();
  formData.append('archivo', archivo);
  return apiRequest(`/imagenes/${imagenId}`, { method: 'PUT', body: formData, auth: true });
};

/** Crear: POST. Editar imagen existente: PUT. Sin imagen previa en edición: POST. */
export const saveProductImage = async (archivo, { productoId, imagenId } = {}) => {
  if (!archivo || !productoId) return;

  if (imagenId) {
    await updateImagen(imagenId, archivo);
    return;
  }

  await uploadImagen(archivo, productoId);
};
