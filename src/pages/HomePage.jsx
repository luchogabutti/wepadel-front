import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
    </>
  );
};
