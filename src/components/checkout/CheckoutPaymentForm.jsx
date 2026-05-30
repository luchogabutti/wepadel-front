import { Box, Typography, TextField } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#201f26',
    borderRadius: 2,
    color: '#e5e1eb',
    '& fieldset': { borderColor: 'rgba(66, 70, 86, 0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(179, 197, 255, 0.3)' },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      boxShadow: '0 0 0 1px rgba(0, 102, 255, 0.3)',
    },
  },
  '& .MuiInputLabel-root': { color: '#c2c6d8' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.light' },
};

export const CheckoutPaymentForm = ({ formData, onFieldChange }) => {
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
        <CreditCardOutlinedIcon sx={{ color: 'primary.light' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
          Método de Pago
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          mb: 3,
          bgcolor: '#201f26',
          borderRadius: 2,
          border: '1px solid rgba(53, 223, 171, 0.2)',
        }}
      >
        <CheckCircleOutlinedIcon sx={{ color: '#35dfab', fontSize: 20 }} />
        <Typography sx={{ color: '#e5e1eb', fontSize: 14, fontWeight: 500 }}>
          Transacción Segura con Tarjeta de Crédito
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Nombre en la Tarjeta"
          placeholder="Como figura en la tarjeta"
          value={formData.cardName}
          onChange={(e) => onFieldChange('cardName', e.target.value)}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Número de Tarjeta"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={(e) => onFieldChange('cardNumber', e.target.value)}
          InputProps={{
            endAdornment: <CreditCardOutlinedIcon sx={{ color: '#8c90a1', fontSize: 20 }} />,
          }}
          sx={inputStyles}
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            fullWidth
            label="Vencimiento"
            placeholder="MM/AA"
            value={formData.expiry}
            onChange={(e) => onFieldChange('expiry', e.target.value)}
            sx={inputStyles}
          />
          <TextField
            fullWidth
            label="CVC"
            placeholder="123"
            value={formData.cvc}
            onChange={(e) => onFieldChange('cvc', e.target.value)}
            sx={inputStyles}
          />
        </Box>
      </Box>
    </Box>
  );
};
