import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { formatCartPrice } from '../../data/cartData';

export const CartSummary = ({ subtotal, total }) => {
  return (
    <Box
      sx={{
        bgcolor: '#2a2931',
        p: 3,
        borderRadius: 3,
        position: { lg: 'sticky' },
        top: { lg: 96 },
        border: '1px solid rgba(66, 70, 86, 0.2)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#e5e1eb' }}>
        Resumen de compra
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>Subtotal</Typography>
          <Typography sx={{ color: '#e5e1eb', fontSize: 16 }}>{formatCartPrice(subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>Envío</Typography>
          <Typography sx={{ color: '#35dfab', fontSize: 16, fontWeight: 500 }}>Gratis</Typography>
        </Box>
        <Box
          sx={{
            pt: 2,
            borderTop: '1px solid rgba(66, 70, 86, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.light' }}>
            {formatCartPrice(total)}
          </Typography>
        </Box>
      </Box>

      <Button
        component={RouterLink}
        to="/checkout"
        fullWidth
        variant="contained"
        sx={{
          py: 1.5,
          bgcolor: 'primary.main',
          color: '#f8f7ff',
          fontSize: 16,
          fontWeight: 700,
          boxShadow: '0px 8px 24px rgba(0, 102, 255, 0.2)',
          '&:hover': {
            bgcolor: 'primary.main',
            transform: 'scale(1.02)',
          },
        }}
      >
        Ir al Checkout
      </Button>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#c2c6d8' }}>
          <VerifiedUserOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Pago seguro garantizado</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#c2c6d8' }}>
          <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Entrega en 24/48 horas</Typography>
        </Box>
      </Box>
    </Box>
  );
};
