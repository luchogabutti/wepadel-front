import { useState, useEffect, useMemo, useCallback } from 'react';
import { Stack, CircularProgress, Box, Typography } from '@mui/material';
import { PageSnackbar } from '../components/general/PageSnackbar/PageSnackbar';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../components/general/TablePaginationFooter/TablePaginationFooter';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { getOrdenes, cancelarOrden, mapOrden } from '../services/ordenesService';

export const OrdersPage = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const { addItem } = useCart();
  const usuarioId = user?.id;

  const [ordersRaw, setOrdersRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((producto) => map.set(producto.id, producto.imagen));
    return map;
  }, [products]);

  const load = useCallback(async () => {
    if (!usuarioId) return;
    setLoading(true);
    try {
      const data = await getOrdenes(usuarioId);
      setOrdersRaw(data ?? []);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    load();
  }, [load]);

  const ordersList = useMemo(
    () => ordersRaw.map((orden) => mapOrden(orden, imageById)),
    [ordersRaw, imageById]
  );

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar((prev) => ({
      open: true,
      message,
      severity,
      key: prev.key + 1,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelarOrden(usuarioId, orderId);
      await load();
      showSnackbar('Orden cancelada.');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo cancelar la orden.', 'error');
    }
  };

  const handleReorder = async (orderId) => {
    const order = ordersList.find((o) => o.id === orderId);
    if (!order) return;
    try {
      for (const item of order.items) {
        await addItem({ id: item.productId, nombre: item.name }, item.quantity);
      }
      showSnackbar('Productos agregados al carrito.');
    } catch {
      showSnackbar('No se pudieron agregar los productos.', 'error');
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader
          variant="profile"
          title="Historial de Órdenes"
          subtitle="Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento."
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      </>
    );
  }

  return (
    <>
      <PageHeader
        variant="profile"
        title="Historial de Órdenes"
        subtitle="Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento."
      />

      {ordersList.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
          Todavía no realizaste ninguna compra.
        </Typography>
      ) : (
        <>
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
        </>
      )}

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
