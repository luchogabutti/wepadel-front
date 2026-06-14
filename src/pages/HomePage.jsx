import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/productsService';

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={products} />
      <CategoriesSection />
    </>
  );
};
