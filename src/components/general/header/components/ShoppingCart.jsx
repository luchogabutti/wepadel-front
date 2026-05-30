import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ShoppingCart = () => {
  return (
    <IconButton 
      component={RouterLink} 
      to="/carrito" 
      aria-label="Carrito"
      sx={{
        color: 'primary.light',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.7,
        }
      }}
    >
      <ShoppingCartIcon />
    </IconButton>
  );
}
