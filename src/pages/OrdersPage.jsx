import { useState } from 'react';
import { Stack } from '@mui/material';
import { PageSnackbar } from '../components/general/PageSnackbar/PageSnackbar';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../components/general/TablePaginationFooter/TablePaginationFooter';
import { orders as initialOrders } from '../data/orders';

export const OrdersPage = () => {
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  const showSnackbar = (message) => {
    setSnackbar((prev) => ({
      open: true,
      message,
      severity: 'success',
      key: prev.key + 1,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCancelOrder = (orderId) => {
    setOrdersList((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: 'cancelada' } : order))
    );
    showSnackbar('Orden cancelada.');
  };

  const handleReorder = () => {
    showSnackbar('Productos agregados al carrito.');
  };

  return (
    <>
      <PageHeader
        variant="profile"
        title="Historial de Órdenes"
        subtitle="Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento."
      />

      <Stack spacing={3}>
        {ordersList.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
            onReorder={handleReorder}
          />
        ))}
      </Stack>

      <TablePaginationFooter
        className="table-pagination-footer--orders"
        label={buildShowingLabel(ordersList.length, ordersList.length, 'órdenes')}
      />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
