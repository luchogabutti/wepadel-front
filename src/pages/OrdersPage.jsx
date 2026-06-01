import { Box, Typography } from '@mui/material';
import { ProfileSidebar } from '../components/profile/ProfileSidebar/ProfileSidebar';
import { OrderCard } from '../components/profile/OrderCard/OrderCard';
import { Footer } from '../components/general/footer/Footer';
import { orders } from '../data/orders';

export const OrdersPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
      {/* Sidebar de Perfil */}
      <ProfileSidebar />

      {/* Área Principal de Contenido */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          ml: { xs: 0, md: '256px' }, // Offset for the fixed sidebar on desktop
          width: { xs: '100%', md: 'calc(100% - 256px)' },
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
                <OrderCard
                  key={order.id}
                  id={order.id}
                  date={order.date}
                  status={order.status}
                  total={order.total}
                  items={order.items}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};
