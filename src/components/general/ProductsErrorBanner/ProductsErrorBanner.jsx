import { Alert, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useProducts } from '../../../context/ProductsContext';
import { getApiErrorMessage } from '../../../services/apiClient';

export const ProductsErrorBanner = () => {
  const { error, loading, refresh } = useProducts();

  if (loading || !error) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      sx={{ borderRadius: 0 }}
      action={
        <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={refresh}>
          Reintentar
        </Button>
      }
    >
      {getApiErrorMessage(error, 'No se pudieron cargar los productos del catálogo.')}
    </Alert>
  );
};
