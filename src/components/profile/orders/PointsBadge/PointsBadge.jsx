import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ConfirmationDialog } from '../../../general/ConfirmationDialog/ConfirmationDialog';
import { useCategorias } from '../../../../context/CategoriesContext';
import './styles.scss';

export const PointsBadge = ({ pointsValue = 500 }) => {
  const [usePointsDialogOpen, setUsePointsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { defaultCatalogPath } = useCategorias();

  const handleUsePoints = () => {
    setUsePointsDialogOpen(true);
  };

  return (
    <Box component="section" className="points-badge-card">
      <Box className="card-gradient-overlay" />

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

      <Box className="points-details-box">
        <Typography variant="h6" className="details-title">
          Mis puntos
        </Typography>
        <Typography variant="body2" className="details-text">
          Acumulás puntos en cada compra de equipos elite. Canjealos por descuentos exclusivos en paletas de carbón y accesorios profesionales.
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handleUsePoints}
        sx={{bgcolor: 'primary.contrastText', color: 'primary.main', py: 1.5}}
      >
        USAR MIS PUNTOS
      </Button>

      <ConfirmationDialog
        open={usePointsDialogOpen}
        onClose={() => setUsePointsDialogOpen(false)}
        onConfirm={() => navigate(defaultCatalogPath)}
        title="Usar mis puntos"
        subtitle="Seras redirigido al cátalogo de productos para poder utilizar tus puntos en la compra de un producto."
        confirmLabel="Ir al catálogo"
      />
    </Box>
  );
};
