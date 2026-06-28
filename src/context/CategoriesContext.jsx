import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getCategorias, mapCategorias } from '../services/categoriasService';

export const DEFAULT_CATEGORIA_ID = 'paletas';
export const DEFAULT_CATALOG_PATH = '/catalogo/paletas';

const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getCategorias();
      setCategorias(mapCategorias(list));
    } catch (err) {
      setError(err);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getCategoriaById = useCallback(
    (id) => categorias.find((cat) => cat.id === id) ?? categorias[0] ?? null,
    [categorias]
  );

  const defaultCatalogPath = useMemo(
    () => getCategoriaById(DEFAULT_CATEGORIA_ID)?.path ?? DEFAULT_CATALOG_PATH,
    [getCategoriaById]
  );

  const value = {
    categorias,
    loading,
    error,
    refresh: load,
    getCategoriaById,
    defaultCatalogPath,
  };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategorias = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategorias debe usarse dentro de CategoriesProvider');
  }
  return context;
};
