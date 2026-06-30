import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/general/header/Header';
import { CartProvider } from '../context/CartContext';
import { ProductsProvider } from '../context/ProductsContext';
import { ProductsErrorBanner } from '../components/general/ProductsErrorBanner/ProductsErrorBanner';
import { fetchCategorias } from '../Redux/categoriesSlice';
import { Box } from '@mui/material';
import { Footer } from '../components/general/footer/Footer';

export const MainLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ProductsProvider>
      <CartProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, width: '100%', pt: '64px' }}>
            <ProductsErrorBanner />
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </CartProvider>
    </ProductsProvider>
  );
}
