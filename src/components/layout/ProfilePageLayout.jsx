import { Box } from '@mui/material';
import { ProfileSidebar } from '../profile/ProfileSidebar/ProfileSidebar';
import { PageContainer } from './PageContainer';

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

export const ProfilePageLayout = ({ children }) => (
  <Box sx={layoutSx}>
    <ProfileSidebar />
    <Box sx={contentSx}>
      <PageContainer narrow py={6}>{children}</PageContainer>
    </Box>
  </Box>
);
