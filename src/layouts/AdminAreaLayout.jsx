import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { adminSidebarItems } from '../config/sidebarItems';
import { fetchAdminProducts } from '../Redux/productsSlice';
import '../components/admin/styles.scss';

export const AdminAreaLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const adminLoaded = useSelector((state) => state.products.adminLoaded);

  useEffect(() => {
    if (adminLoaded) return;
    dispatch(fetchAdminProducts());
  }, [dispatch, adminLoaded]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', bgcolor: 'background.default' }}>
      <Sidebar user={user} items={adminSidebarItems} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        <PageContainer maxWidth={false} py={5}>
          <Box className="admin-main-inner">
            <Outlet />
          </Box>
        </PageContainer>
      </Box>
    </Box>
  );
};
