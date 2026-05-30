import { Box, Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { formatCheckoutPrice } from '../../data/cartData';

export const CheckoutProductSummary = ({ items }) => {
  return (
    <Box
      sx={{
        bgcolor: '#1c1b22',
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(66, 70, 86, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <ShoppingBagOutlinedIcon sx={{ color: 'primary.light' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
          Resumen de productos
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              bgcolor: '#201f26',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                flexShrink: 0,
                borderRadius: 1.5,
                overflow: 'hidden',
                bgcolor: '#2a2931',
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 600, color: '#e5e1eb', fontSize: 15 }}>
                {item.name}
              </Typography>
              <Typography sx={{ color: '#c2c6d8', fontSize: 13 }}>
                Cantidad: {item.quantity}
              </Typography>
              <Typography sx={{ color: '#8c90a1', fontSize: 13 }}>{item.detail}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, color: '#e5e1eb', whiteSpace: 'nowrap' }}>
              {formatCheckoutPrice(item.unitPrice * item.quantity)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
