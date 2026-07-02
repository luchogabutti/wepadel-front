import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import { OrdersListSection } from '../components/profile/orders/OrdersListSection/OrdersListSection';
import { useCart } from '../hooks/useCart';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import { fetchUserOrders, cancelOrder } from '../Redux/ordersSlice';
import { buildImageById, mapOrden } from '../utils/orders';

export const OrdersView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const ordersRaw = useSelector((state) => state.orders.items);
  const loading = useSelector((state) => state.orders.loading);
  const mutating = useSelector((state) => state.orders.mutating);
  const error = useSelector((state) => state.orders.error);
  const userOrdersLoaded = useSelector((state) => state.orders.userOrdersLoaded);
  const { addItem } = useCart();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const usuarioId = user?.id;

  useEffect(() => {
    if (!usuarioId) return;
    dispatch(fetchUserOrders(usuarioId));
  }, [dispatch, usuarioId]);

  const imageById = useMemo(() => buildImageById(products), [products]);

  const ordersList = useMemo(
    () => ordersRaw.map((orden) => mapOrden(orden, imageById)),
    [ordersRaw, imageById]
  );

  const handleRetry = () => {
    if (usuarioId) dispatch(fetchUserOrders(usuarioId));
  };

  const handleCancelOrder = async (orderId) => {
    const result = await dispatch(cancelOrder({ usuarioId, ordenId: orderId }));

    if (cancelOrder.rejected.match(result)) {
      notifyError(result.payload || 'No se pudo cancelar la orden.');
      return;
    }

    notifySuccess('Orden cancelada.');
  };

  const handleReorder = async (orderId) => {
    const order = ordersList.find((item) => item.id === orderId);
    if (!order) return;

    try {
      for (const item of order.items) {
        await addItem({ id: item.productId, nombre: item.name }, item.quantity);
      }
    } catch {
      notifyError('No se pudieron agregar los productos.');
    }
  };

  const isInitialLoad = !userOrdersLoaded && loading;

  return (
    <OrdersListSection
      title="Historial de Órdenes"
      subtitle="Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento."
      orders={ordersList}
      loading={isInitialLoad}
      error={error}
      loadingMessage="Cargando tus pedidos..."
      errorFallback="No se pudieron cargar tus pedidos."
      emptyMessage="Todavía no realizaste ninguna compra."
      paginationLabel="órdenes"
      onRetry={handleRetry}
      renderOrder={(order) => (
        <OrderCard
          order={order}
          onCancel={handleCancelOrder}
          onReorder={handleReorder}
        />
      )}
    />
  );
};
