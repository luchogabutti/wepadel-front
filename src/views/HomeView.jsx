import { Alert } from '@mui/material';
import { useMemo } from 'react';
import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { useProducts } from '../context/ProductsContext';

const FEATURED_COUNT = 4;

export const HomeView = () => {
  const { products, loading, error } = useProducts();

  const featured = useMemo(
    () => products.filter((p) => p.estaHabilitado !== false).slice(0, FEATURED_COUNT),
    [products]
  );

  const renderFeatured = () => {
    if (loading) {
      return <LoadingState message="Cargando productos destacados..." />;
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mx: 3, my: 4, maxWidth: 900 }}>
          No se pudieron cargar los productos. Intentá nuevamente más tarde.
        </Alert>
      );
    }

    return <FeaturedProducts products={featured} />;
  };

  return (
    <>
      <HeroSection />
      {renderFeatured()}
      <CategoriesSection />
    </>
  );
};
