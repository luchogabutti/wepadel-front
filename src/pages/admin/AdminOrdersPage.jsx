import { Stack } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import { OrderCard } from '../../components/profile/orders/OrderCard/OrderCard';
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../../components/general/TablePaginationFooter/TablePaginationFooter';
import { adminOrders } from '../../data/adminOrders';

export const AdminOrdersPage = () => {
  return (
    <>
      <PageHeader
        variant="profile"
        title="Pedidos de la tienda"
        subtitle="Vista global de todos los pedidos. En producción el backend filtrará por rol y permisos."
      />

      <Stack spacing={3}>
        {adminOrders.map((order) => (
          <OrderCard key={order.id} order={order} showCustomer />
        ))}
      </Stack>

      <TablePaginationFooter
        className="table-pagination-footer--orders"
        label={buildShowingLabel(adminOrders.length, adminOrders.length, 'pedidos')}
      />
    </>
  );
};
