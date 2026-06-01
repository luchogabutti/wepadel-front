import { Box, Typography, Button } from '@mui/material';
import './styles.scss';

export const PointsBadge = ({ pointsValue = 500 }) => {
  const handleRedeemPoints = () => {
    console.log('Redeem points clicked');
    // Implementación futura de canje de puntos
  };

  return (
    <Box component="section" className="points-badge-card">
      {/* Overlay de gradiente */}
      <Box className="card-gradient-overlay" />

      {/* Saldo de Puntos */}
      <Box className="points-header">
        <Typography variant="overline" className="points-label">
          Saldo Actual
        </Typography>
        <Box className="points-display">
          <Typography variant="h1" className="points-number">
            {pointsValue}
          </Typography>
          <Typography variant="subtitle1" className="points-unit">
            PTS
          </Typography>
        </Box>
      </Box>

      {/* Información / Caja de Detalles */}
      <Box className="points-details-box">
        <Typography variant="h6" className="details-title">
          Mis puntos
        </Typography>
        <Typography variant="body2" className="details-text">
          Acumulás puntos en cada compra de equipos elite. Canjealos por descuentos exclusivos en paletas de carbón y accesorios profesionales.
        </Typography>
      </Box>

      {/* Botón de Canjear */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleRedeemPoints}
        className="redeem-btn"
        sx={{
          bgcolor: '#FFFFFF',
          color: '#0066FF',
          fontWeight: 800,
          py: 1.5,
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          transition: 'all 0.15s ease',
        }}
      >
        CANJEAR PUNTOS
      </Button>
    </Box>
  );
};
