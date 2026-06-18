import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingState = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6,
      gap: 2,
    }}
  >
    <CircularProgress color="primary" />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
);
