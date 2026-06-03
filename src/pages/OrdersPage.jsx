import { Stack } from '@mui/material';
import { ProfilePageLayout } from '../components/layout/ProfilePageLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import { orders } from '../data/orders';

export const OrdersPage = () => {
  return (
    <ProfilePageLayout>
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
    </ProfilePageLayout>
  );
};
