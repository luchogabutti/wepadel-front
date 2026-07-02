import { Alert, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Redux/productsSlice';
import { getApiErrorMessage } from '../../../utils/api';

export const ProductsErrorBanner = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  if (loading || !error) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      sx={{ borderRadius: 0 }}
      action={
        <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={() => dispatch(fetchProducts())}>
          Reintentar
        </Button>
      }
    >
      {getApiErrorMessage(error, 'No se pudieron cargar los productos del catálogo.')}
    </Alert>
  );
};
