import { Box, Typography, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import { formatCheckoutPrice } from '../../data/cartData';

export const CheckoutPaymentDetail = ({ subtotal, pointsDiscount, total, onConfirm }) => {
  return (
    <Box
      sx={{
        bgcolor: '#2a2931',
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(66, 70, 86, 0.2)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#e5e1eb' }}>
        Detalle del Pago
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>Subtotal</Typography>
          <Typography sx={{ color: '#e5e1eb', fontSize: 16 }}>{formatCheckoutPrice(subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>Envío</Typography>
          <Typography sx={{ color: '#35dfab', fontSize: 16, fontWeight: 500 }}>Gratis</Typography>
        </Box>
        {pointsDiscount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>Descuento por puntos</Typography>
            <Typography sx={{ color: '#35dfab', fontSize: 16, fontWeight: 500 }}>
              -{formatCheckoutPrice(pointsDiscount)}
            </Typography>
          </Box>
        )}
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
            Total Final
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#e5e1eb' }}>
            {formatCheckoutPrice(total)}
          </Typography>
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        startIcon={<LockOutlinedIcon />}
        onClick={onConfirm}
        sx={{
          py: 1.5,
          bgcolor: 'primary.main',
          color: '#f8f7ff',
          fontSize: 16,
          fontWeight: 700,
          boxShadow: '0px 8px 24px rgba(0, 102, 255, 0.2)',
          '&:hover': { bgcolor: 'primary.main', transform: 'scale(1.02)' },
        }}
      >
        Confirmar compra
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 2 }}>
        <LockOutlinedIcon sx={{ fontSize: 14, color: '#8c90a1' }} />
        <Typography sx={{ color: '#8c90a1', fontSize: 12 }}>Pago procesado de forma segura</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, opacity: 0.5 }}>
        <CreditCardOutlinedIcon sx={{ color: '#8c90a1' }} />
        <AccountBalanceWalletOutlinedIcon sx={{ color: '#8c90a1' }} />
        <ContactlessOutlinedIcon sx={{ color: '#8c90a1' }} />
      </Box>
    </Box>
  );
};
