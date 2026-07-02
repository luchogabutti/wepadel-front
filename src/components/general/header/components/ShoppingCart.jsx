import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';

export const ShoppingCart = () => {
  const { itemCount } = useCart();

  return (
    <IconButton
      component={RouterLink}
      to="/carrito"
      aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} productos` : ''}`}
      sx={{
        color: 'primary.light',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <Badge
        badgeContent={itemCount}
        invisible={itemCount === 0}
        sx={{
          '& .MuiBadge-badge': {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 10,
            fontWeight: 700,
            minWidth: 18,
            height: 18,
            padding: '0 4px',
            border: '2px solid',
            borderColor: 'background.default',
          },
        }}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};
