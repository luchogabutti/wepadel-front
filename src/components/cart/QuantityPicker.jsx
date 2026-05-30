import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const QuantityPicker = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#201f26',
        borderRadius: '9999px',
        px: 0.5,
        py: 0.25,
        border: '1px solid rgba(66, 70, 86, 0.2)',
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Disminuir cantidad"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.light' } }}
      >
        <RemoveIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Typography sx={{ px: 2, fontWeight: 500, fontSize: 13, minWidth: 24, textAlign: 'center' }}>
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrease}
        aria-label="Aumentar cantidad"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.light' } }}
      >
        <AddIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};
