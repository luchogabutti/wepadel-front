import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './ShoppingCart.css';

export function ShoppingCart() {
  return (
    <IconButton 
      component={RouterLink} 
      to="/carrito" 
      className="cart-icon-wrapper"
      aria-label="Carrito"
    >
      <ShoppingCartIcon />
    </IconButton>
  );
}
