import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/general/header/Header';
import { ProductsErrorBanner } from '../components/general/ProductsErrorBanner/ProductsErrorBanner';
import { fetchCategorias } from '../Redux/categoriesSlice';
import { fetchProducts } from '../Redux/productsSlice';
import { fetchCart, resetCart } from '../Redux/cartSlice';
import { Box } from '@mui/material';
import { Footer } from '../components/general/footer/Footer';

export const MainLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const usuarioId = user?.id;
  const isCliente = Boolean(user?.token && user?.rol !== 'ADMINISTRADOR');

  useEffect(() => {
    dispatch(fetchCategorias());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!isCliente || !usuarioId) {
      dispatch(resetCart());
      return;
    }

    dispatch(fetchCart(usuarioId));
  }, [dispatch, isCliente, usuarioId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, width: '100%', pt: '64px' }}>
        <ProductsErrorBanner />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
