import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ConfirmationDialog } from '../../../general/confirmationDialog/ConfirmationDialog';
import { OrderDetailDrawer } from '../OrderDetailDrawer/OrderDetailDrawer';
import './styles.scss';

export const OrderCard = ({order}) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const getStatusLabel = () => {
    switch (order.status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendiente':
        return 'Pendiente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return order.status;
    }
  };

  const handleCancelOrder = () => {
    console.log(`Order cancelled for ID: ${order.id}`);
  };

  const handleReorder = () => {
    console.log(`Reorder clicked for ID: ${order.id}`);
  };


  const visibleItems = order.items.slice(0, 2);
  const remainingCount = order.items.length - 2;

  return (
    <Box className={`surface-card--paper order-card-container ${order.status}`}>
      <Box className="order-card-header">
        <Box className="order-meta-info">
          <Typography variant="caption" className="order-id">
            Pedido #{order.id}
          </Typography>
          <Typography variant="body2" className="order-date">
            Realizado {order.date}
          </Typography>
        </Box>

        <Box className="order-summary-info">
          <Box className={`order-status-badge ${order.status}`}>
            {getStatusLabel()}
          </Box>
          <Typography variant="h6" className={`order-total ${order.status === 'cancelada' ? 'line-through' : ''}`}>
            ${order.total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

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

        <Box className="order-actions-row">
          {order.status === 'pendiente' && (
            <Button
              variant="outlined"
              onClick={() => setCancelDialogOpen(true)}
              sx={{borderColor: 'error.main', color: 'error.main'}}
            >
              Cancelar orden
            </Button>
          )}

          {order.status === 'cancelada' && (
            <Button
              variant="outlined"
              onClick={handleReorder}
              sx={{borderColor: 'text.secondary', color: 'text.secondary'}}
            >
              Reordenar
            </Button>
          )}

          {order.status !== 'cancelada' && (
            <Button
              variant="outlined"
              onClick={() => setDetailOpen(true)}
              sx={{color: 'primary.light', borderColor: 'primary.light'}}
            >
              Ver Detalle
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
        confirmColor="error"
      />

      <OrderDetailDrawer
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        order={order}
      />
    </Box>
  );
};
