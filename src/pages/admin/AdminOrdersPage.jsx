import { useState, useEffect, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { PageHeader } from '../../components/layout/PageHeader';
import { OrderCard } from '../../components/profile/orders/OrderCard/OrderCard';
import { TablePaginationFooter } from '../../components/general/TablePaginationFooter/TablePaginationFooter';
import { buildShowingLabel } from '../../utils/paginationLabels';
import { adminSectionContent } from '../../data/adminProductsData';
import { useProducts } from '../../context/ProductsContext';
import { usePagination } from '../../hooks/usePagination';
import { getAllOrdenes, mapOrden } from '../../services/ordenesService';

export const AdminOrdersPage = () => {
  const { products } = useProducts();
  const [ordersRaw, setOrdersRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((producto) => map.set(producto.id, producto.imagen));
    return map;
  }, [products]);

  useEffect(() => {
    getAllOrdenes()
      .then((data) => setOrdersRaw(data ?? []))
      .catch((error) => console.error('Error al obtener los pedidos:', error))
      .finally(() => setLoading(false));
  }, []);

  const ordersList = useMemo(
    () => ordersRaw.map((orden) => mapOrden(orden, imageById)),
    [ordersRaw, imageById]
  );

  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(ordersList, 5);

  return (
    <>
      <PageHeader
        variant="profile"
        title={adminSectionContent.orders.title}
        subtitle={adminSectionContent.orders.subtitle}
      />

      {loading ? (
        <LoadingState message="Cargando pedidos..." />
      ) : ordersList.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
          No hay pedidos registrados.
        </Typography>
      ) : (
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
      )}
    </>
  );
};
