import { useState, useEffect, useMemo, useCallback } from 'react';
import { getProducts, getImagenesByProductoId } from '../services/productsService';
import { getStockByProducto } from '../services/stocksService';
import { getDescuentosByProducto } from '../services/descuentosService';
import { mapProducto } from '../services/productMapper';
import { enrichProductoConDescuento } from '../utils/discountUtils';

const toCategoryId = (categoria) => (categoria || '').toLowerCase();

const mapAdminProduct = (producto, stock) => ({
  id: producto.id,
  title: producto.nombre,
  name: producto.nombre,
  sku: `WP-${String(producto.id).padStart(4, '0')}`,
  categoryId: toCategoryId(producto.categoria),
  category: producto.categoria,
  price: Number(producto.precio ?? 0),
  stock: stock ?? 0,
  enabled: producto.estaHabilitado !== false,
  img: producto.imagen,
  image: producto.imagen,
  imagenId: producto.imagenId ?? null,
  description: producto.descripcion ?? '',
});

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getProducts({ auth: true });
      const withDetails = await Promise.all(
        list.map(async (producto) => {
          const [imagenes, stock, descuentos] = await Promise.all([
            getImagenesByProductoId(producto.id).catch(() => []),
            getStockByProducto(producto.id)
              .then((s) => s?.cantidad ?? 0)
              .catch(() => 0),
            getDescuentosByProducto(producto.id).catch(() => []),
          ]);
          return enrichProductoConDescuento(
            { ...mapProducto(producto, imagenes), stock },
            descuentos
          );
        })
      );
      setProducts(withDetails);
    } catch (err) {
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const adminProducts = useMemo(
    () => products.map((producto) => mapAdminProduct(producto, producto.stock)),
    [products]
  );

  return {
    products: adminProducts,
    loading,
    error,
    refresh: load,
  };
};
