import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

export const CartEmptyState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
        textAlign: 'center',
      }}
    >
      <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 80, color: '#8c90a1', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#e5e1eb', mb: 1 }}>
        Tu carrito está vacío
      </Typography>
      <Typography sx={{ color: '#c2c6d8', fontSize: 16, mb: 4 }}>
        Aún no has añadido equipamiento a tu selección.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{
          px: 4,
          py: 1.5,
          bgcolor: 'primary.main',
          color: '#f8f7ff',
          fontWeight: 700,
        }}
      >
        Ver catálogo
      </Button>
    </Box>
  );
};
