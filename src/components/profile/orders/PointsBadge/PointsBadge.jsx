import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ConfirmationDialog } from '../../../general/ConfirmationDialog/ConfirmationDialog';
import { useSelector } from 'react-redux';
import { getDefaultCatalogPath } from '../../../../Redux/categoriesSlice';
import { getApiErrorMessage } from '../../../../utils/api';
import './styles.scss';

export const PointsBadge = ({
  pointsValue = 0,
  error = null,
  loading = false,
  onRetry,
}) => {
  const [usePointsDialogOpen, setUsePointsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const categorias = useSelector((state) => state.categories.items);
  const defaultCatalogPath = getDefaultCatalogPath(categorias);

  const handleUsePoints = () => {
    setUsePointsDialogOpen(true);
  };

  if (loading && !error) {
    return (
      <Box component="section" className="points-badge-card points-badge-card--loading">
        <CircularProgress size={32} sx={{ color: 'primary.contrastText', zIndex: 2 }} />
        <Typography variant="body2" sx={{ color: 'primary.contrastText', zIndex: 2, mt: 1 }}>
          Cargando puntos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="section" className="points-badge-card points-badge-card--error">
        <Box className="card-gradient-overlay" />
        <Box className="points-error-box">
          <Typography variant="h6" className="points-error-title">
            No se pudieron cargar tus puntos
          </Typography>
          <Typography variant="body2" className="points-error-text">
            {getApiErrorMessage(error, 'No se pudieron cargar los puntos.')}
          </Typography>
          {onRetry && (
            <Button
              variant="contained"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
              sx={{ mt: 2, bgcolor: 'primary.contrastText', color: 'primary.main' }}
            >
              Reintentar
            </Button>
          )}
        </Box>
      </Box>
    );
  }

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
        sx={{ bgcolor: 'primary.contrastText', color: 'primary.main', py: 1.5 }}
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
