import { useState, useEffect, useMemo } from 'react';
import { Stack, CircularProgress, Box, Typography } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import { OrderCard } from '../../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../../components/general/TablePaginationFooter/TablePaginationFooter';
import { adminSectionContent } from '../../data/adminProductsData';
import { useProducts } from '../../context/ProductsContext';
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

  return (
    <>
      <PageHeader
        variant="profile"
        title={adminSectionContent.orders.title}
        subtitle={adminSectionContent.orders.subtitle}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : ordersList.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
          No hay pedidos registrados.
        </Typography>
      ) : (
        <>
          <Stack spacing={3}>
            {ordersList.map((order) => (
              <OrderCard key={order.id} order={order} showCustomer />
            ))}
          </Stack>

          <TablePaginationFooter
            className="table-pagination-footer--orders"
            label={buildShowingLabel(ordersList.length, ordersList.length, 'pedidos')}
          />
        </>
      )}
    </>
  );
};
