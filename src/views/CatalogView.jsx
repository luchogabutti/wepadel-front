import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Alert } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryTabs } from '../components/catalog/CategoryTabs/CategoryTabs';
import { ProductGrid } from '../components/catalog/ProductGrid/ProductGrid';
import { categories } from '../data/categoriesData';
import { useProducts } from '../context/ProductsContext';

export const CatalogView = () => {
  const { categoria } = useParams();
  const activeCategory = categoria ?? 'paletas';

  const { products, loading, error } = useProducts();

  const title = categories.find((cat) => cat.id === activeCategory)?.label;

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.estaHabilitado !== false &&
          p.categoria?.toLowerCase() === activeCategory
      ),
    [activeCategory, products]
  );

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando productos..." />;
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ my: 4 }}>
          No se pudieron cargar los productos. Intentá nuevamente más tarde.
        </Alert>
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
