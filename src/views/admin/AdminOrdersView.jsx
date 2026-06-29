import { useState, useEffect, useMemo, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { PageHeader } from '../../components/layout/PageHeader';
import { OrderCard } from '../../components/profile/orders/OrderCard/OrderCard';
import { TablePaginationFooter } from '../../components/general/TablePaginationFooter/TablePaginationFooter';
import { buildShowingLabel } from '../../utils/paginationLabels';
import { useProducts } from '../../context/ProductsContext';
import { usePagination } from '../../hooks/usePagination';
import { getAllOrdenes, mapOrden } from '../../services/ordenesService';

export const AdminOrdersView = () => {
  const { products } = useProducts();
  const [ordersRaw, setOrdersRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((producto) => map.set(producto.id, producto.imagen));
    return map;
  }, [products]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOrdenes();
      setOrdersRaw(data ?? []);
    } catch (err) {
      setError(err);
      setOrdersRaw([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ordersList = useMemo(
    () => ordersRaw.map((orden) => mapOrden(orden, imageById)),
    [ordersRaw, imageById]
  );

  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(ordersList, 5);

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando pedidos..." />;
    }

    if (error) {
      return (
        <ApiErrorState
          error={error}
          fallback="No se pudieron cargar los pedidos."
          onRetry={load}
        />
      );
    }

    if (ordersList.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
          No hay pedidos registrados.
        </Typography>
      );
    }

    return (
      <>
        <Stack spacing={3}>
          {paginatedItems.map((order) => (
            <OrderCard key={order.id} order={order} showCustomer />
          ))}
        </Stack>

        <TablePaginationFooter
          className="table-pagination-footer--orders"
          label={buildShowingLabel(rangeStart, rangeEnd, totalCount, 'pedidos')}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </>
    );
  };

  return (
    <>
      <PageHeader
        variant="profile"
        title="Pedidos de la tienda"
        subtitle="Vista global de todos los pedidos de clientes."
      />
      {renderContent()}
    </>
  );
};
