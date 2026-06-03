import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { accountUser } from '../config/accountUser';
import { profileSidebarItems } from '../config/sidebarItems';

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

export const ProfileAreaLayout = () => (
  <Box sx={layoutSx}>
    <Sidebar user={accountUser} items={profileSidebarItems} />
    <Box sx={contentSx}>
      <PageContainer narrow py={6}>
        <Outlet />
      </PageContainer>
    </Box>
  </Box>
);
