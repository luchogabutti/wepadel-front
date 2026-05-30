import { Box, Typography, Button, TextField } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

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

export const CheckoutShippingCard = ({
  shippingData,
  isCompleted,
  onFieldChange,
  onSubmit,
  onEdit,
}) => {
  const formattedAddress = `${shippingData.address}, ${shippingData.city}`;

  if (isCompleted) {
    return (
      <Box
        sx={{
          bgcolor: '#1c1b22',
          p: 3,
          borderRadius: 3,
          border: '1px solid rgba(66, 70, 86, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: '#201f26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocalShippingOutlinedIcon sx={{ color: 'primary.light' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#e5e1eb' }}>Envío a Domicilio</Typography>
              <Typography sx={{ color: '#c2c6d8', fontSize: 14 }}>{formattedAddress}</Typography>
            </Box>
          </Box>
          <Button
            onClick={onEdit}
            sx={{
              color: 'primary.light',
              fontWeight: 600,
              fontSize: 14,
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(179, 197, 255, 0.08)' },
            }}
          >
            Cambiar
          </Button>
        </Box>
      </Box>
    );
  }

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
        <LocalShippingOutlinedIcon sx={{ color: 'primary.light' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
          Envío a Domicilio
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Dirección"
          placeholder="Av. Libertador 1234"
          value={shippingData.address}
          onChange={(e) => onFieldChange('address', e.target.value)}
          sx={inputStyles}
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField
            fullWidth
            label="Ciudad"
            placeholder="CABA"
            value={shippingData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
            sx={inputStyles}
          />
          <TextField
            fullWidth
            label="Código postal"
            placeholder="1425"
            value={shippingData.postalCode}
            onChange={(e) => onFieldChange('postalCode', e.target.value)}
            sx={inputStyles}
          />
        </Box>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!shippingData.address.trim() || !shippingData.city.trim()}
          sx={{
            alignSelf: 'flex-start',
            mt: 1,
            px: 3,
            py: 1.25,
            bgcolor: 'primary.main',
            color: '#f8f7ff',
            fontWeight: 700,
            '&:hover': { bgcolor: 'primary.main' },
          }}
        >
          Confirmar envío
        </Button>
      </Box>
    </Box>
  );
};
