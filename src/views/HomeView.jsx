import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';
import { useMemo } from 'react';
import { useProducts } from '../context/ProductsContext';

const FEATURED_COUNT = 4;

export const HomeView = () => {
  const { products } = useProducts();

  const featured = useMemo(
    () => products.filter((p) => p.estaHabilitado !== false).slice(0, FEATURED_COUNT),
    [products]
  );

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featured} />
      <CategoriesSection />
    </>
  );
};
