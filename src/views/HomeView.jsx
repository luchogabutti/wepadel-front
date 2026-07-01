import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../components/general/ApiErrorState/ApiErrorState';
import { fetchProducts } from '../Redux/productsSlice';

const FEATURED_COUNT = 4;

export const HomeView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

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
        <ApiErrorState
          error={error}
          fallback="No se pudieron cargar los productos destacados."
          onRetry={() => dispatch(fetchProducts())}
          sx={{ m: 8 }}
        />
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
