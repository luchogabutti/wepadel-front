import { Outlet } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { accountUser } from '../config/accountUser';
import { adminSidebarItems } from '../config/sidebarItems';
import '../components/admin/styles.scss';

export const AdminAreaLayout = () => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', bgcolor: 'background.default' }}>
    <Sidebar user={accountUser} items={adminSidebarItems} />
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
      <PageContainer maxWidth={false} py={5}>
        <Box className="admin-main-inner">
          <Alert severity="info" sx={{ mb: 3 }}>
            El administrador podrá acceder directamente al panel desde el botón del navbar una vez
            se haya logueado correctamente.
          </Alert>
          <Outlet />
        </Box>
      </PageContainer>
    </Box>
  </Box>
);
