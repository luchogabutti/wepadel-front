import { Box } from '@mui/material';

const centeredSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  minHeight: 'calc(100vh - 64px)',
};

export const CenteredPage = ({ children }) => (
  <Box sx={centeredSx}>{children}</Box>
);
