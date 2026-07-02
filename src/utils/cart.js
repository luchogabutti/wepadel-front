import { getProductImageUrl, PLACEHOLDER_IMG } from './products';
import { getPrecioEfectivo } from './discountUtils';

export const createEmptyCart = () => ({ items: [], subtotal: 0 });

const getLineUnitPrice = (item) => {
  const producto = item.producto ?? {};
  return Number(item.precioUnitarioConDescuento ?? producto.precio ?? 0);
};

export const recalculateCartSubtotal = (items = []) =>
  items.reduce((sum, item) => sum + getLineUnitPrice(item) * Number(item.cantidad ?? 0), 0);

const buildCartLineItem = (product, cantidad) => {
  const hasDiscount = product.precioConDescuento != null;
  return {
    producto: product,
    cantidad,
    ...(hasDiscount ? { precioUnitarioConDescuento: getPrecioEfectivo(product) } : {}),
  };
};

export const applyCartAddItem = (raw, product, cantidad = 1) => {
  const items = [...(raw?.items ?? [])];
  const index = items.findIndex((item) => item.producto?.id === product.id);

  if (index >= 0) {
    items[index] = buildCartLineItem(product, items[index].cantidad + cantidad);
  } else {
    items.push(buildCartLineItem(product, cantidad));
  }

  return { items, subtotal: recalculateCartSubtotal(items) };
};

export const applyCartUpdateItem = (raw, productoId, cantidad) => {
  const items = (raw?.items ?? []).map((item) =>
    item.producto?.id === productoId ? { ...item, cantidad } : item
  );

  return { items, subtotal: recalculateCartSubtotal(items) };
};

export const applyCartRemoveItem = (raw, productoId) => {
  const items = (raw?.items ?? []).filter((item) => item.producto?.id !== productoId);
  return { items, subtotal: recalculateCartSubtotal(items) };
};

export const applyCartClear = () => createEmptyCart();

export { buildImageById } from './products';

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
