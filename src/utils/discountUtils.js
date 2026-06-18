export const getDescuentoVigente = (descuentos = []) => {
  const now = new Date();
  return (
    descuentos.find((descuento) => {
      if (!descuento?.activo) return false;
      const inicio = new Date(descuento.fechaInicio);
      const fin = new Date(descuento.fechaFin);
      return now >= inicio && now <= fin;
    }) ?? null
  );
};

export const calcularPrecioConDescuento = (precio, porcentaje) => {
  const base = Number(precio) || 0;
  const pct = Number(porcentaje) || 0;
  return base * (1 - pct / 100);
};

export const enrichProductoConDescuento = (producto, descuentos = []) => {
  const descuento = getDescuentoVigente(descuentos);
  const precioOriginal = Number(producto.precio) || 0;

  if (!descuento) {
    return {
      ...producto,
      precioConDescuento: null,
      descuentoPorcentaje: null,
    };
  }

  const precioConDescuento = calcularPrecioConDescuento(precioOriginal, descuento.porcentaje);

  return {
    ...producto,
    precioConDescuento,
    descuentoPorcentaje: Number(descuento.porcentaje),
  };
};

export const getPrecioEfectivo = (producto) =>
  producto.precioConDescuento ?? Number(producto.precio) ?? 0;
