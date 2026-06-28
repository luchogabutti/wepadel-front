import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../components/general/ApiErrorState/ApiErrorState';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryTabs } from '../components/catalog/CategoryTabs/CategoryTabs';
import { ProductGrid } from '../components/catalog/ProductGrid/ProductGrid';
import { slugToCategoriaEnum, DEFAULT_CATEGORIA_SLUG } from '../constants/categorias';
import { useProducts } from '../context/ProductsContext';

export const CatalogView = () => {
  const { categoria } = useParams();
  const activeCategory = categoria ?? DEFAULT_CATEGORIA_SLUG;
  const activeEnum = slugToCategoriaEnum(activeCategory);

  const { products, loading, error, refresh } = useProducts();

  const title = activeEnum;

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.estaHabilitado !== false &&
          p.categoria?.toUpperCase() === activeEnum
      ),
    [activeEnum, products]
  );

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando productos..." />;
    }

    if (error) {
      return (
        <ApiErrorState
          error={error}
          fallback="No se pudieron cargar los productos."
          onRetry={refresh}
        />
      );
    }

    if (categoryProducts.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          No hay productos disponibles en esta categoría.
        </Typography>
      );
    }

    return <ProductGrid products={categoryProducts} activeCategory={activeCategory} />;
  };

  return (
    <>
      <CategoryTabs activeCategory={activeCategory} />
      <PageContainer>
        <PageHeader
          title={title}
          subtitle="Equipamiento de alto rendimiento para jugadores exigentes."
        />
        {renderContent()}
      </PageContainer>
    </>
  );
};
