import { Alert, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getApiErrorMessage } from '../../../utils/api';

export const ApiErrorState = ({
  error,
  message,
  fallback = 'No se pudieron cargar los datos.',
  onRetry,
  retryLabel = 'Reintentar',
  sx,
}) => {
  const text = message ?? getApiErrorMessage(error, fallback);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
        px: 2,
        gap: 2,
        ...sx,
      }}
    >
      <Alert severity="error" sx={{ width: '100%', maxWidth: 560 }}>
        {text}
      </Alert>
      {onRetry && (
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </Box>
  );
};
