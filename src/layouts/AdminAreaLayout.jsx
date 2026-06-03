import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { AdminProvider } from '../context/AdminContext';
import { accountUser } from '../config/accountUser';
import { adminSidebarItems } from '../config/sidebarItems';
import '../components/admin/styles.scss';

const layoutSx = {
  display: 'flex',
  alignItems: 'flex-start',
  bgcolor: 'background.default',
};

const contentSx = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minWidth: 0,
};

export const AdminAreaLayout = () => (
  <AdminProvider>
    <Box sx={layoutSx}>
      <Sidebar user={accountUser} items={adminSidebarItems} />
      <Box sx={contentSx}>
        <PageContainer maxWidth={false} py={5}>
          <Box className="admin-main-inner">
            <Outlet />
          </Box>
        </PageContainer>
      </Box>
    </Box>
  </AdminProvider>
);
