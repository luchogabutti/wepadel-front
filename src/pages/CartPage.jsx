import { Box, Container, Typography } from '@mui/material';
import { CartItem } from '../components/cart/CartItem/CartItem';
import { CartSummary } from '../components/cart/CartSummary/CartSummary';
import { CartEmptyState } from '../components/cart/CartEmptyState/CartEmptyState';
import { useCart } from '../context/CartContext';
import { CART_SUMMARY } from '../data/cartData';

export const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = CART_SUMMARY.subtotal;
  const total = CART_SUMMARY.total;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#e5e1eb',
            mb: 4,
            fontSize: { xs: 28, md: 32 },
          }}
        >
          Mi carrito
        </Typography>

        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 4,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Box>
            <CartSummary subtotal={subtotal} total={total} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
