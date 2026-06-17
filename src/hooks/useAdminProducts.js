import { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts } from '../context/ProductsContext';
import { getStockByProducto } from '../services/stocksService';

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
  description: producto.descripcion ?? '',
});

export const useAdminProducts = () => {
  const { products, loading: productsLoading, refresh: refreshProducts } = useProducts();
  const [stockMap, setStockMap] = useState({});
  const [stockLoading, setStockLoading] = useState(true);

  const loadStocks = useCallback(async () => {
    if (products.length === 0) {
      setStockMap({});
      setStockLoading(false);
      return;
    }
    setStockLoading(true);
    const entries = await Promise.all(
      products.map(async (producto) => {
        try {
          const stock = await getStockByProducto(producto.id);
          return [producto.id, stock?.cantidad ?? 0];
        } catch {
          return [producto.id, 0];
        }
      })
    );
    setStockMap(Object.fromEntries(entries));
    setStockLoading(false);
  }, [products]);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  const adminProducts = useMemo(
    () => products.map((producto) => mapAdminProduct(producto, stockMap[producto.id])),
    [products, stockMap]
  );

  return {
    products: adminProducts,
    loading: productsLoading || stockLoading,
    refresh: refreshProducts,
    refreshStocks: loadStocks,
  };
};
