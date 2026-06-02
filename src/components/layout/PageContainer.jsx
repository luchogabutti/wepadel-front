import { Box, Container } from '@mui/material';

export const PageContainer = ({ children, maxWidth = 'lg', narrow = false, py = 4 }) => (
  <Container
    maxWidth={maxWidth}
    sx={{
      flexGrow: 1,
      py,
      px: { xs: 2, md: 6 },
    }}
  >
    {narrow ? (
      <Box sx={{ maxWidth: '1024px', mx: 'auto', width: '100%' }}>{children}</Box>
    ) : (
      children
    )}
  </Container>
);
