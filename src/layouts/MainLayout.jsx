import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/general/header/Header';
import { CartAddNotification } from '../components/cart/CartAddNotification/CartAddNotification';
import { CartProvider } from '../context/CartContext';
import { Box } from '@mui/material';
import { Footer } from '../components/general/footer/Footer';

export const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
        <Header />
        <CartAddNotification />
        <Box component="main" sx={{ flexGrow: 1, width: '100%', pt: '64px' }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </CartProvider>
  );
}
