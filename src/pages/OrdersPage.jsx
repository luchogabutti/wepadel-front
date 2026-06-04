import { Stack } from '@mui/material';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../components/general/TablePaginationFooter/TablePaginationFooter';
import { orders } from '../data/orders';

export const OrdersPage = () => {
  return (
    <>
      <PageHeader
        variant="profile"
        title="Historial de Órdenes"
        subtitle="Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento."
      />

      <Stack spacing={3}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Stack>

      <TablePaginationFooter
        className="table-pagination-footer--orders"
        label={buildShowingLabel(orders.length, orders.length, 'órdenes')}
      />
    </>
  );
};
