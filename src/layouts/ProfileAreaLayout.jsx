import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { accountUser } from '../config/accountUser';
import { profileSidebarItems } from '../config/sidebarItems';

export const ProfileAreaLayout = () => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', bgcolor: 'background.default' }}>
    <Sidebar user={accountUser} items={profileSidebarItems} />
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
      <PageContainer narrow py={6}>
        <Outlet />
      </PageContainer>
    </Box>
  </Box>
);
