import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { CenteredPage } from '../components/layout/CenteredPage';
import { PageContainer } from '../components/layout/PageContainer';
import { CheckoutSuccessCard } from '../components/checkout/CheckoutSuccessCard/CheckoutSuccessCard';
import { useSelector } from 'react-redux';
import { useProducts } from '../context/ProductsContext';
import { getOrdenById } from '../services/ordenesService';
import { PLACEHOLDER_IMG } from '../services/productMapper';

export const CheckoutSuccessView = () => {
  const { orderId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { products } = useProducts();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    getOrdenById(user.id, orderId)
      .then(setOrden)
      .catch((err) => console.error('Error al obtener la orden:', err))
      .finally(() => setLoading(false));
  }, [user?.id, orderId]);

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((producto) => map.set(producto.id, producto.imagen));
    return map;
  }, [products]);

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
