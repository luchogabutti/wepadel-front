import axios from 'axios';
import { API_BASE_URL, PLACEHOLDER_IMG } from './api';
import { enrichProductoConDescuento } from './discountUtils';

export { PLACEHOLDER_IMG };

export const getProductImageUrl = (product) => {
  const url = product?.imagenPrincipal?.url;
  if (!url) return PLACEHOLDER_IMG;
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

export const getProductImagenId = (product) => product?.imagenPrincipal?.id ?? null;

export const buildImageById = (products = []) => {
  const map = new Map();
  products.forEach((producto) => map.set(producto.id, getProductImageUrl(producto)));
  return map;
};

export const toProductoPayload = (product, overrides = {}) => ({
  nombre: product.nombre,
  descripcion: product.descripcion?.trim() ? product.descripcion : product.nombre,
  precio: Number(product.precio),
  categoria: (product.categoria || '').toUpperCase(),
  estaHabilitado: product.estaHabilitado !== false,
  ...overrides,
});

export const mapProductFromApi = (apiProduct) => {
  const { imagenPrincipal, imagenes, descuentos = [], stock = 0, ...producto } = apiProduct;

  return {
    ...enrichProductoConDescuento({ ...producto, stock }, descuentos),
    imagenPrincipal: imagenPrincipal ?? imagenes?.[0] ?? null,
    descuentos,
  };
};

export const mapProductsFromApi = (list) => (list ?? []).map(mapProductFromApi);

export const buildProductFromMutation = ({
  producto,
  stock = 0,
  imagenPrincipal = null,
  descuentos = [],
  discountFields = {},
}) => {
  const mapped = mapProductFromApi({
    ...producto,
    stock,
    imagenPrincipal,
    descuentos,
  });

  if (discountFields.precioConDescuento == null && discountFields.descuentoPorcentaje == null) {
    return mapped;
  }

  return { ...mapped, ...discountFields };
};

const parseImagenIdFromLocation = (location) => {
  if (!location) return null;
  const id = Number(location.split('/').pop());
  return Number.isFinite(id) ? id : null;
};

export const saveProductImageRequest = async (archivo, { productoId, imagenId }, authHeaders = {}) => {
  if (!archivo || !productoId) return null;

  const formData = new FormData();
  formData.append('archivo', archivo);

  const config = { headers: { ...authHeaders, 'Content-Type': 'multipart/form-data' } };

  if (imagenId) {
    await axios.put(`${API_BASE_URL}/imagenes/${imagenId}`, formData, config);
    return {
      id: imagenId,
      nombre: archivo.name,
      url: `/imagenes/${imagenId}/archivo`,
    };
  }

  formData.append('productoId', productoId);
  const response = await axios.post(`${API_BASE_URL}/imagenes`, formData, config);
  const newId = parseImagenIdFromLocation(response.headers?.location ?? response.headers?.Location);
  if (!newId) return null;

  return {
    id: newId,
    nombre: archivo.name,
    url: `/imagenes/${newId}/archivo`,
  };
};
