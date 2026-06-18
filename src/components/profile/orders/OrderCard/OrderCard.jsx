import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ConfirmationDialog } from '../../../general/ConfirmationDialog/ConfirmationDialog';
import { OrderDetailDrawer } from '../OrderDetailDrawer/OrderDetailDrawer';
import './styles.scss';

export const OrderCard = ({ order, showCustomer = false, onCancel, onReorder }) => {
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
    onCancel?.(order.id);
  };

  const handleReorder = () => {
    onReorder?.(order.id);
  };

  const visibleItems = order.items.slice(0, 2);
  const remainingCount = order.items.length - 2;
  const pointsUsed = order.pointsUsed ?? 0;
  const pointsEarned = order.pointsEarned ?? 0;

  return (
    <Box className={`surface-card--paper order-card-container ${order.status}`}>
      <Box className="order-card-header">
        <Box className="order-meta-info">
          <Typography variant="caption" className="order-id">
            Pedido #{order.id}
          </Typography>
          {showCustomer && order.customerName && (
            <Typography variant="body2" className="order-customer">
              Cliente: {order.customerName}
            </Typography>
          )}
          <Typography variant="body2" className="order-date">
            Realizado {order.date}
          </Typography>
        </Box>

        <Box className="order-summary-info">
          <Box className={`order-status-badge ${order.status}`}>{getStatusLabel()}</Box>
          <Typography
            variant="h6"
            className={`order-total ${order.status === 'cancelada' ? 'line-through' : ''}`}
          >
            ${order.total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Box className="order-points-row">
        <Typography variant="caption" className="order-points-label">
          Puntos usados: <strong>{pointsUsed}</strong>
        </Typography>
        <Typography variant="caption" className="order-points-label">
          Puntos generados: <strong>{pointsEarned}</strong>
        </Typography>
      </Box>

      <Box className="order-card-body">
        <Box className="items-previews-row">
          {visibleItems.map((item, idx) => (
            <Box key={idx} className="item-preview">
              <Box className="item-thumbnail-box">
                <img src={item.image} alt={item.name} className="item-thumbnail-img" />
              </Box>
              <Typography variant="caption" className="item-preview-name" title={item.name}>
                {item.name}
              </Typography>
              <Typography variant="caption" className="item-preview-qty">
                x{item.quantity}
              </Typography>
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
          {(order.status === 'pendiente' || order.status === 'confirmada') && onCancel && (
            <Button
              variant="outlined"
              onClick={() => setCancelDialogOpen(true)}
              sx={{ borderColor: 'error.main', color: 'error.main' }}
            >
              Cancelar orden
            </Button>
          )}

          {order.status === 'cancelada' && onReorder && (
            <Button
              variant="outlined"
              onClick={handleReorder}
              sx={{ borderColor: 'text.secondary', color: 'text.secondary' }}
            >
              Reordenar
            </Button>
          )}

          {order.status !== 'cancelada' && (
            <Button
              variant="outlined"
              onClick={() => setDetailOpen(true)}
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
      >
        {pointsUsed > 0 && (
          <Typography variant="body2" className="order-cancel-warning">
            Aviso: Los puntos usados en esta compra no serán reembolsados.
          </Typography>
        )}
      </ConfirmationDialog>

      <OrderDetailDrawer open={detailOpen} onClose={() => setDetailOpen(false)} order={order} />
    </Box>
  );
};
