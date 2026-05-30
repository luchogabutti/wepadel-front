import { Box, Typography, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { QuantityPicker } from './QuantityPicker';
import { formatCartPrice } from '../../data/cartData';

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const lineTotal = item.unitPrice * item.quantity;

  const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#1c1b22',
        p: 2,
        borderRadius: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 2,
        border: '1px solid rgba(66, 70, 86, 0.1)',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: 128 },
          height: 128,
          flexShrink: 0,
          bgcolor: '#201f26',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          justifyContent: 'space-between',
          width: '100%',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#c2c6d8', mt: 0.5 }}>
            {item.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'primary.light', mt: 0.5, fontWeight: 600 }}>
            {formatCartPrice(item.unitPrice)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <QuantityPicker
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
              {formatCartPrice(lineTotal)}
            </Typography>
            <Button
              onClick={() => onRemove(item.id)}
              startIcon={<DeleteOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                mt: 0.5,
                color: '#ffb4ab',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.04em',
                p: 0,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
              }}
            >
              QUITAR
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
