import { useParams, useLocation } from 'react-router-dom';
import { CenteredPage } from '../components/layout/CenteredPage';
import { PageContainer } from '../components/layout/PageContainer';
import { CheckoutSuccessCard } from '../components/checkout/CheckoutSuccessCard/CheckoutSuccessCard';
import { CHECKOUT_ITEMS } from '../data/cartData';
export const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const pointsEarned = location.state?.pointsEarned ?? 120;

  const productImages = CHECKOUT_ITEMS.slice(0, 2).map((item) => item.image);
  const extraItemsCount = Math.max(CHECKOUT_ITEMS.length - 2, 0);

  return (
    <CenteredPage>
      <PageContainer maxWidth="lg" py={6}>
        <CheckoutSuccessCard
          orderId={orderId}
          pointsEarned={pointsEarned}
          productImages={productImages}
          extraItemsCount={extraItemsCount}
        />
      </PageContainer>
    </CenteredPage>
  );
};
