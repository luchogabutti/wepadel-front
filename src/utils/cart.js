import { getProductImageUrl, PLACEHOLDER_IMG } from './products';

export const buildImageById = (products = []) => {
  const map = new Map();
  products.forEach((producto) => map.set(producto.id, getProductImageUrl(producto)));
  return map;
};

export const mapCartItem = (carritoItem, imageById = new Map()) => {
  const producto = carritoItem.producto ?? {};
  const originalUnitPrice = Number(producto.precio ?? 0);
  const unitPrice = Number(carritoItem.precioUnitarioConDescuento ?? producto.precio ?? 0);

  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.categoria,
    unitPrice,
    originalUnitPrice,
    hasDiscount: originalUnitPrice > unitPrice,
    quantity: carritoItem.cantidad,
    image: imageById.get(producto.id) || PLACEHOLDER_IMG,
  };
};

export const buildCartItems = (raw, imageById = new Map()) =>
  (raw?.items ?? []).map((item) => mapCartItem(item, imageById));

export const buildCartTotals = (items = [], subtotal = 0) => {
  const subtotalOriginal = items.reduce(
    (sum, item) => sum + item.originalUnitPrice * item.quantity,
    0
  );

  return {
    subtotal: Number(subtotal ?? 0),
    subtotalOriginal,
    discountTotal: Math.max(0, subtotalOriginal - Number(subtotal ?? 0)),
    itemCount: items.length,
  };
};
