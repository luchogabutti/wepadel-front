import { Box } from '@mui/material';
import { HeroSection } from '../components/home/HeroSection/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection/CategoriesSection';
import { Footer } from '../components/general/footer/Footer';

export const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <Footer />
    </Box>
  );
}

