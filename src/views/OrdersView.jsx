import { useState, useEffect, useMemo, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
} from '../components/general/TablePaginationFooter/TablePaginationFooter';
import { buildShowingLabel } from '../utils/paginationLabels';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { usePagination } from '../hooks/usePagination';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import { getOrdenes, cancelarOrden, mapOrden } from '../services/ordenesService';

export const OrdersView = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const usuarioId = user?.id;

  const [ordersRaw, setOrdersRaw] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(ordersList, 5);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelarOrden(usuarioId, orderId);
      await load();
      notifySuccess('Orden cancelada.');
    } catch (error) {
      notifyError(error.message || 'No se pudo cancelar la orden.');
    }
  };

  const handleReorder = async (orderId) => {
    const order = ordersList.find((o) => o.id === orderId);
    if (!order) return;
    try {
      for (const item of order.items) {
        await addItem({ id: item.productId, nombre: item.name }, item.quantity);
      }
    } catch {
      notifyError('No se pudieron agregar los productos.');
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
        <LoadingState message="Cargando tus pedidos..." />
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
            {paginatedItems.map((order) => (
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
            label={buildShowingLabel(rangeStart, rangeEnd, totalCount, 'órdenes')}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};
