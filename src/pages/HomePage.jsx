import { Box } from '@mui/material';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { Footer } from '../components/general/footer/Footer';

export function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <Footer />
    </Box>
  );
}
