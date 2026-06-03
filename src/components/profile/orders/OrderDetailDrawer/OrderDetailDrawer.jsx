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
        <OrderField label="Fecha" value={order.date} />
        <OrderField label="Estado" value={STATUS_LABELS[order.status] ?? order.status} />
        <OrderField label="Total" value={`$${order.total.toFixed(2)}`} />

        <Typography variant="caption" className="order-detail-section-label">
          Productos
        </Typography>

        <Box className="order-detail-items">
          {order.items.map((item, index) => (
            <Box key={index} className="order-detail-item">
              <img src={item.image} alt={item.name} className="order-detail-item-image" />
              <Typography variant="body2" className="order-detail-item-name">
                {item.name}
              </Typography>
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
