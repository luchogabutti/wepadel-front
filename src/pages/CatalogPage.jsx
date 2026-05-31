import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { CategoryTabs } from '../components/catalog/CategoryTabs';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { Footer } from '../components/general/footer/Footer';
import { categories } from '../data/categoriesData';
import { allProducts } from '../data/productsData';

export const CatalogPage = () => {
  const { categoria } = useParams();
  const activeCategory = categoria ?? 'paletas';

  const title = categories.find((cat) => cat.id === activeCategory)?.label;

  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.categoryId === activeCategory),
    [activeCategory]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CategoryTabs activeCategory={activeCategory} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          flex: 1,
          px: { xs: 2, md: 6 },
          py: 4,
          gap: 4,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '32px', md: '40px' },
                letterSpacing: '-0.02em',
                mb: 1,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Equipamiento de alto rendimiento para jugadores exigentes.
            </Typography>
          </Box>

          <ProductGrid products={categoryProducts} activeCategory={activeCategory} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
