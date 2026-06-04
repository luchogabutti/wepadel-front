import { Grid, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
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
    <PageContainer>
      <PageHeader title="Mi carrito" />

      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={2}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <CartSummary subtotal={subtotal} total={total} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};
