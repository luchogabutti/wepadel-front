import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './styles.scss';

const STATUS_LABELS = {
  confirmada: 'Confirmada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
};

const OrderField = ({ label, value }) => (
  <Box className="order-detail-field">
    <Typography variant="caption" className="order-detail-label">
      {label}
    </Typography>
    <Typography variant="body1" className="order-detail-value">
      {value}
    </Typography>
  </Box>
);

export const OrderDetailDrawer = ({ open, onClose, order }) => {
  if (!order) return null;

  const pointsUsed = order.pointsUsed ?? 0;
  const pointsEarned = order.pointsEarned ?? 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      className="order-detail-drawer-root"
      slotProps={{
        paper: {
          className: 'order-detail-drawer-paper',
          sx: { width: { xs: '70%', md: '500px' } },
        },
      }}
    >
      <Box className="order-detail-drawer-header">
        <Typography variant="h6" className="order-detail-drawer-title">
          Detalle del pedido
        </Typography>
        <IconButton onClick={onClose} aria-label="Cerrar" className="order-detail-close-icon">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider className="order-detail-divider" />

      <Box className="order-detail-drawer-body">
        <OrderField label="Nº de pedido" value={`#${order.id}`} />
        {order.customerName && <OrderField label="Cliente" value={order.customerName} />}
        <OrderField label="Fecha" value={order.date} />
        <OrderField label="Estado" value={STATUS_LABELS[order.status] ?? order.status} />
        <OrderField label="Total" value={`$${order.total.toFixed(2)}`} />
        <OrderField label="Puntos usados" value={String(pointsUsed)} />
        <OrderField label="Puntos generados" value={String(pointsEarned)} />

        <Typography variant="caption" className="order-detail-section-label">
          Productos
        </Typography>

        <Box className="order-detail-items">
          {order.items.map((item, index) => (
            <Box key={index} className="order-detail-item">
              <img src={item.image} alt={item.name} className="order-detail-item-image" />
              <Box className="order-detail-item-info">
                <Typography variant="body2" className="order-detail-item-name">
                  {item.name}
                </Typography>
                <Typography variant="caption" className="order-detail-item-meta">
                  x{item.quantity} · ${item.unitPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="order-detail-drawer-footer">
        <Button fullWidth variant="outlined" onClick={onClose} className="order-detail-close-btn">
          Cerrar
        </Button>
      </Box>
    </Drawer>
  );
};
