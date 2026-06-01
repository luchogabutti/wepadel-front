import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ConfirmationDialog } from '../../general/ConfirmationDialog/ConfirmationDialog';
import './styles.scss';

export const OrderCard = ({
  id,
  date,
  status, // 'confirmada', 'pendiente', 'cancelada'
  total,
  items = [], // array de { image, name }
}) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const getStatusLabel = () => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendiente':
        return 'Pendiente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const handleCancelOrder = () => {
    console.log(`Order cancelled for ID: ${id}`);
  };

  const handleViewDetails = () => {
    console.log(`View details clicked for ID: ${id}`);
  };

  const handleReorder = () => {
    console.log(`Reorder clicked for ID: ${id}`);
  };

  // Renderizar las imágenes de los productos en miniatura (máximo 2 visibles, el resto agrupado en un indicador +N)
  const visibleItems = items.slice(0, 2);
  const remainingCount = items.length - 2;

  return (
    <Box className={`order-card-container ${status}`}>
      {/* Cabecera del Pedido */}
      <Box className="order-card-header">
        <Box className="order-meta-info">
          <Typography variant="caption" className="order-id">
            Pedido #{id}
          </Typography>
          <Typography variant="body2" className="order-date">
            Realizado {date}
          </Typography>
        </Box>

        <Box className="order-summary-info">
          <Box className={`order-status-badge ${status}`}>
            {getStatusLabel()}
          </Box>
          <Typography variant="h6" className={`order-total ${status === 'cancelada' ? 'line-through' : ''}`}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* Cuerpo del Pedido: Lista de Ítems */}
      <Box className="order-card-body">
        <Box className="items-previews-row">
          {visibleItems.map((item, idx) => (
            <Box key={idx} className="item-thumbnail-box">
              <img src={item.image} alt={item.name} className="item-thumbnail-img" />
            </Box>
          ))}
          {remainingCount > 0 && (
            <Box className="remaining-indicator-box">
              <Typography variant="body2" className="remaining-text">
                +{remainingCount}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Acciones del Pedido */}
        <Box className="order-actions-row">
          {status === 'pendiente' && (
            <Button
              variant="outlined"
              onClick={() => setCancelDialogOpen(true)}
              className="action-btn cancel-btn"
              sx={{
                borderColor: '#FF4444',
                color: '#FF4444',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 68, 68, 0.08)',
                  borderColor: '#FF4444',
                },
              }}
            >
              Cancelar orden
            </Button>
          )}

          {status === 'cancelada' && (
            <Button
              variant="outlined"
              onClick={handleReorder}
              className="action-btn reorder-btn"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#A0AEC0',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                },
              }}
            >
              Reordenar
            </Button>
          )}

          {status !== 'cancelada' && (
            <Button
              variant="outlined"
              onClick={handleViewDetails}
              className="action-btn details-btn"
              sx={{
                color: 'primary.light',
                borderColor: 'primary.light',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: 'primary.light',
                  bgcolor: 'rgba(179, 197, 255, 0.08)',
                },
              }}
            >
              Ver Detalles
            </Button>
          )}
        </Box>
      </Box>

      <ConfirmationDialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleCancelOrder}
        title="¿Cancelar esta orden?"
        subtitle="La orden pendiente se cancelará. Esta acción no se puede deshacer."
        confirmLabel="Sí, cancelar"
        cancelLabel="Volver"
        confirmColor="error"
      />
    </Box>
  );
};
