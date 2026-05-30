import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export const CheckoutSuccessCard = ({ orderId, pointsEarned, productImages, extraItemsCount }) => {
  return (
    <Box
      sx={{
        maxWidth: 640,
        mx: 'auto',
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        background: 'linear-gradient(180deg, #1c1b22 0%, #14121a 100%)',
        border: '1px solid rgba(66, 70, 86, 0.2)',
        boxShadow: '0 0 40px rgba(53, 223, 171, 0.08)',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          mx: 'auto',
          mb: 3,
          borderRadius: '50%',
          bgcolor: '#35dfab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(53, 223, 171, 0.4)',
        }}
      >
        <CheckCircleOutlinedIcon sx={{ fontSize: 48, color: '#0e0d14' }} />
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, color: '#e5e1eb', mb: 1 }}>
        ¡Compra confirmada!
      </Typography>
      <Typography sx={{ color: '#c2c6d8', fontSize: 16, mb: 4 }}>
        Tu pedido ha sido procesado con éxito y pronto estará en camino.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ bgcolor: '#201f26', p: 2, borderRadius: 2, border: '1px solid rgba(66, 70, 86, 0.2)' }}>
          <Typography
            sx={{ color: '#8c90a1', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', mb: 0.5 }}
          >
            NÚMERO DE ORDEN
          </Typography>
          <Typography sx={{ fontWeight: 700, color: '#e5e1eb', fontSize: 18 }}>#{orderId}</Typography>
        </Box>
        <Box sx={{ bgcolor: '#201f26', p: 2, borderRadius: 2, border: '1px solid rgba(53, 223, 171, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
            <StarOutlinedIcon sx={{ color: '#35dfab', fontSize: 14 }} />
            <Typography
              sx={{ color: '#35dfab', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em' }}
            >
              BENEFICIO EXCLUSIVE
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, color: '#35dfab', fontSize: 18 }}>
            Ganaste {pointsEarned} puntos
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 4 }}>
        {productImages.map((img, index) => (
          <Box
            key={index}
            sx={{
              width: 72,
              height: 72,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: '#201f26',
            }}
          >
            <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        ))}
        {extraItemsCount > 0 && (
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 2,
              bgcolor: '#201f26',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(66, 70, 86, 0.2)',
            }}
          >
            <Typography sx={{ color: '#e5e1eb', fontSize: 13, fontWeight: 600 }}>
              + {extraItemsCount} items
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
        }}
      >
        <Button
          component={RouterLink}
          to="/mis-pedidos"
          variant="outlined"
          sx={{
            px: 3,
            py: 1.5,
            borderColor: 'rgba(229, 225, 235, 0.3)',
            color: '#e5e1eb',
            fontWeight: 600,
            '&:hover': { borderColor: '#e5e1eb', bgcolor: 'rgba(229, 225, 235, 0.05)' },
          }}
        >
          Ver mis órdenes
        </Button>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: 'primary.light',
            color: '#002b75',
            fontWeight: 700,
            '&:hover': { bgcolor: '#dae1ff' },
          }}
        >
          Seguir comprando
        </Button>
      </Box>

      <Typography sx={{ color: '#8c90a1', fontSize: 13, mt: 4 }}>
        ¿Tienes alguna duda?{' '}
        <Box component="span" sx={{ color: 'primary.light', cursor: 'pointer' }}>
          Contacta a soporte élite
        </Box>
      </Typography>
    </Box>
  );
};
