import { getProductImageUrl, PLACEHOLDER_IMG } from './products';

const STATUS_MAP = {
  CONFIRMADA: 'confirmada',
  CANCELADA: 'cancelada',
};

const formatFecha = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const buildImageById = (products = []) => {
  const map = new Map();
  products.forEach((producto) => map.set(producto.id, getProductImageUrl(producto)));
  return map;
};

export const mapOrden = (orden, imageById = new Map()) => ({
  id: orden.id,
  date: formatFecha(orden.fechaCompra),
  status: STATUS_MAP[orden.estado] ?? 'confirmada',
  total: Number(orden.total ?? 0),
  pointsEarned: orden.puntosGenerados ?? 0,
  pointsUsed: orden.puntosUsados ?? 0,
  customerName: orden.usuario?.nombreApellido ?? orden.usuario?.mail ?? '',
  items: (orden.items ?? []).map((item) => ({
    productId: item.producto?.id,
    name: item.producto?.nombre,
    quantity: item.cantidad,
    unitPrice: Number(item.precioUnitario ?? 0),
    image: imageById.get(item.producto?.id) || PLACEHOLDER_IMG,
  })),
});
