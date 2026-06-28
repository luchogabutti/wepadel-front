import { Grid, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CartItem } from '../components/cart/CartItem/CartItem';
import { CartSummary } from '../components/cart/CartSummary/CartSummary';
import { CartEmptyState } from '../components/cart/CartEmptyState/CartEmptyState';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../components/general/ApiErrorState/ApiErrorState';
import { useCart } from '../context/CartContext';

export const CartView = () => {
  const { items, subtotal, discountTotal, updateQuantity, removeItem, loading, error, refresh } =
    useCart();
  const total = subtotal;

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando tu carrito..." />;
    }

    if (error) {
      return (
        <ApiErrorState
          error={error}
          fallback="No se pudo cargar el carrito."
          onRetry={refresh}
        />
      );
    }

    if (items.length === 0) {
      return <CartEmptyState />;
    }

    return (
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
          <CartSummary subtotal={subtotal} discountTotal={discountTotal} total={total} />
        </Grid>
      </Grid>
    );
  };

  return (
    <PageContainer>
      <PageHeader title="Mi carrito" />
      {renderContent()}
    </PageContainer>
  );
};
