import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCard } from '../../components/profile/orders/OrderCard/OrderCard';
import { OrdersListSection } from '../../components/profile/orders/OrdersListSection/OrdersListSection';
import { fetchAllOrders } from '../../Redux/ordersSlice';
import { buildImageById, mapOrden } from '../../utils/orders';

export const AdminOrdersView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const ordersRaw = useSelector((state) => state.orders.items);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const adminOrdersLoaded = useSelector((state) => state.orders.adminOrdersLoaded);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const imageById = useMemo(() => buildImageById(products), [products]);

  const ordersList = useMemo(
    () => ordersRaw.map((orden) => mapOrden(orden, imageById)),
    [ordersRaw, imageById]
  );

  const isInitialLoad = !adminOrdersLoaded && loading;

  return (
    <OrdersListSection
      title="Pedidos de la tienda"
      subtitle="Vista global de todos los pedidos de clientes."
      orders={ordersList}
      loading={isInitialLoad}
      error={error}
      loadingMessage="Cargando pedidos..."
      errorFallback="No se pudieron cargar los pedidos."
      emptyMessage="No hay pedidos registrados."
      paginationLabel="pedidos"
      onRetry={() => dispatch(fetchAllOrders())}
      renderOrder={(order) => <OrderCard order={order} showCustomer />}
    />
  );
};
