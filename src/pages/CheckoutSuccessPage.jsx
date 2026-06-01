import { Box, Container } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { CheckoutSuccessCard } from '../components/checkout/CheckoutSuccessCard/CheckoutSuccessCard';
import { CHECKOUT_ITEMS } from '../data/cartData';

export const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const pointsEarned = location.state?.pointsEarned ?? 120;

  const productImages = CHECKOUT_ITEMS.slice(0, 2).map((item) => item.image);
  const extraItemsCount = Math.max(CHECKOUT_ITEMS.length - 2, 0);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6, px: { xs: 2, md: 6 } }}>
        <CheckoutSuccessCard
          orderId={orderId}
          pointsEarned={pointsEarned}
          productImages={productImages}
          extraItemsCount={extraItemsCount}
        />
      </Container>
    </Box>
  );
};
