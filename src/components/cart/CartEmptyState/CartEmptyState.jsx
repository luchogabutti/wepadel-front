import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import './styles.scss';

export const CartEmptyState = () => {
  return (
    <div className="cart-empty-state">
      <RemoveShoppingCartOutlinedIcon className="empty-icon" />
      <Typography variant="h5" className="empty-title">
        Tu carrito está vacío
      </Typography>
      <Typography className="empty-description">
        Aún no has añadido equipamiento a tu selección.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        className="catalog-btn"
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
      >
        Ver catálogo
      </Button>
    </div>
  );
};
