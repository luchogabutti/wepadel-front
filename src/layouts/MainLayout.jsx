import { Outlet } from 'react-router-dom';
import { Header } from '../components/general/header/Header';
import { Box } from '@mui/material';
import { useScrollToTop } from '../hooks/useScrollToTop';

export const MainLayout = () => {
  useScrollToTop();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, width: '100%', pt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
