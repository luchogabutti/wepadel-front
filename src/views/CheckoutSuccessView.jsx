import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { CenteredPage } from '../components/layout/CenteredPage';
import { PageContainer } from '../components/layout/PageContainer';
import { CheckoutSuccessCard } from '../components/checkout/CheckoutSuccessCard/CheckoutSuccessCard';
import { fetchOrderById } from '../Redux/ordersSlice';
import { buildImageById } from '../utils/orders';
import { PLACEHOLDER_IMG } from '../utils/products';

export const CheckoutSuccessView = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const orden = useSelector((state) => state.orders.current);
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    if (!user?.id || !orderId) return;
    dispatch(fetchOrderById({ usuarioId: user.id, ordenId: orderId }));
  }, [dispatch, user?.id, orderId]);

  const imageById = useMemo(() => buildImageById(products), [products]);

  if (loading) {
    return (
      <CenteredPage>
        <LoadingState message="Cargando confirmación..." />
      </CenteredPage>
    );
  }

  const items = orden?.items ?? [];
  const productImages = items
    .slice(0, 2)
    .map((item) => imageById.get(item.producto?.id) || PLACEHOLDER_IMG);
  const extraItemsCount = Math.max(items.length - 2, 0);
  const pointsEarned = orden?.puntosGenerados ?? 0;

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
