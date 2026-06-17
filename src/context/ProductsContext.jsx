import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProducts, getImagenesByProductoId } from '../services/productsService';
import { getStockByProducto } from '../services/stocksService';
import { mapProducto } from '../services/productMapper';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getProducts();
      const withDetails = await Promise.all(
        list.map(async (producto) => {
          const [imagenes, stock] = await Promise.all([
            getImagenesByProductoId(producto.id).catch(() => []),
            getStockByProducto(producto.id)
              .then((s) => s?.cantidad)
              .catch(() => undefined),
          ]);
          return { ...mapProducto(producto, imagenes), stock };
        })
      );
      setProducts(withDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = { products, loading, error, refresh: load };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }
  return context;
};
