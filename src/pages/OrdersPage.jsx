import { Box, Typography } from '@mui/material';
import { ProfileSidebar } from '../components/profile/ProfileSidebar/ProfileSidebar';
import { OrderCard } from '../components/profile/orders/OrderCard/OrderCard';
import { orders } from '../data/orders';

export const OrdersPage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
      <ProfileSidebar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Cuerpo de la Página */}
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 6 }, py: 6 }}>
          <Box sx={{ maxWidth: '1024px', mx: 'auto' }}>
            {/* Cabecera del Historial */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '32px', md: '44px' },
                  letterSpacing: '-0.02em',
                  mb: 1,
                  color: 'primary.light',
                }}
              >
                Historial de Órdenes
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                Revisa y gestiona tus pedidos recientes de equipo de alto rendimiento.
              </Typography>
            </Box>

            {/* Listado de Tarjetas de Orden */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
