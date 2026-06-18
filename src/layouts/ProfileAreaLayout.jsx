import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from '../components/general/Sidebar/Sidebar';
import { PageContainer } from '../components/layout/PageContainer';
import { profileSidebarItems } from '../config/sidebarItems';
import { useAuth } from '../context/AuthContext';

export const ProfileAreaLayout = () => {
  const { user } = useAuth(); 

  return (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', bgcolor: 'background.default' }}>
    <Sidebar user={user} items={profileSidebarItems} />
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
      <PageContainer narrow py={6}>
        <Outlet />
      </PageContainer>
    </Box>
  </Box>
  )
};
