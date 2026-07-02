import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../components/general/ApiErrorState/ApiErrorState';
import { CheckoutProductSummary } from '../components/checkout/CheckoutProductSummary/CheckoutProductSummary';
import { CheckoutShippingCard } from '../components/checkout/CheckoutShippingCard/CheckoutShippingCard';
import { CheckoutPaymentForm } from '../components/checkout/CheckoutPaymentForm/CheckoutPaymentForm';
import { CheckoutPointsCard } from '../components/checkout/CheckoutPointsCard/CheckoutPointsCard';
import { CheckoutPaymentDetail } from '../components/checkout/CheckoutPaymentDetail/CheckoutPaymentDetail';
import { useCart } from '../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints } from '../Redux/profileSlice';
import { fetchCart } from '../Redux/cartSlice';
import { withForceRefresh } from '../Redux/fetchArgs';
import { createOrder } from '../Redux/ordersSlice';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import {
  isCheckoutReady,
  isShippingValid,
  getPointsDiscount,
  getCheckoutValidationMessage,
} from '../utils/checkoutValidation';

const MONTO_ENVIO = 0;

export const CheckoutView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { points, pointsConversion, pointsLoading, pointsError } = useSelector(
    (state) => state.profile
  );
  const mutating = useSelector((state) => state.orders.mutating);
  const { items, subtotal, refresh, loading: cartLoading } = useCart();
  const { notifyError } = useAppSnackbar();
  const usuarioId = user?.id;
  const [checkoutSynced, setCheckoutSynced] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    postalCode: '',
  });
  const [shippingCompleted, setShippingCompleted] = useState(false);

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [usePoints, setUsePoints] = useState(true);
  const [pointsMode, setPointsMode] = useState('all');
  const [manualPoints, setManualPoints] = useState('');
  const [showPaymentValidation, setShowPaymentValidation] = useState(false);

  const syncCheckoutData = useCallback(async () => {
    if (!usuarioId) return;

    setCheckoutSynced(false);
    setSyncError(null);

    const [pointsResult, cartResult] = await Promise.all([
      dispatch(fetchPoints(withForceRefresh(usuarioId))),
      refresh(),
    ]);

    if (fetchCart.rejected.match(cartResult)) {
      setSyncError(cartResult.payload || 'No se pudo cargar el carrito.');
    }

    if (fetchPoints.rejected.match(pointsResult)) {
      setUsePoints(false);
    }

    setCheckoutSynced(true);
  }, [dispatch, usuarioId, refresh]);

  useEffect(() => {
    if (!usuarioId) return;

    let cancelled = false;

    const runSync = async () => {
      await syncCheckoutData();
      if (cancelled) return;
    };

    runSync();

    return () => {
      cancelled = true;
    };
  }, [usuarioId, syncCheckoutData]);

  const handleRetryPoints = () => {
    if (usuarioId) dispatch(fetchPoints(withForceRefresh(usuarioId)));
  };

  const availablePoints = points;
  const conversion = pointsConversion || 1;

  const pointsState = {
    usePoints,
    pointsMode,
    manualPoints,
    availablePoints,
  };

  const puntosUsados = getPointsDiscount(usePoints, pointsMode, manualPoints, availablePoints);
  const pointsDiscount = puntosUsados * conversion;
  const total = Math.max(subtotal + MONTO_ENVIO - pointsDiscount, 0);

  const hasItems = items.length > 0;
  const isSyncing = !checkoutSynced || pointsLoading || cartLoading;
  const canConfirm = hasItems && isCheckoutReady(shippingCompleted, formData, pointsState) && !isSyncing;

  const validationMessage = !hasItems
    ? 'Tu carrito está vacío. Agregá productos antes de finalizar la compra.'
    : getCheckoutValidationMessage(shippingCompleted, formData, pointsState);

  const handleManualPointsChange = (value) => {
    setManualPoints(value);
  };

  const handleShippingFieldChange = (field, value) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingSubmit = () => {
    if (!isShippingValid(shippingData)) return;

    setShippingCompleted(true);
  };

  const handleShippingEdit = () => {
    setShippingCompleted(false);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    if (!canConfirm) {
      setShowPaymentValidation(true);
      return;
    }

    const result = await dispatch(
      createOrder({
        usuarioId,
        payload: {
          usuario: usuarioId,
          direccion: `${shippingData.address}, ${shippingData.city}`,
          cp: shippingData.postalCode,
          montoEnvio: MONTO_ENVIO,
          usaPuntos: usePoints && puntosUsados > 0,
          puntosUsados: usePoints ? puntosUsados : 0,
        },
      })
    );

    if (createOrder.rejected.match(result)) {
      notifyError(result.payload || 'No se pudo confirmar la compra. Intentá nuevamente.');
      return;
    }

    const orden = result.payload;
    await refresh();
    navigate(`/checkout/confirmacion/${orden.id}`, {
      state: { pointsEarned: orden.puntosGenerados },
    });
  };

  if (isSyncing) {
    return (
      <PageContainer>
        <LoadingState message="Preparando checkout..." />
      </PageContainer>
    );
  }

  if (syncError) {
    return (
      <PageContainer>
        <PageHeader
          title="Checkout"
          subtitle="Revisá tu pedido y completá tu envio antes de finalizar la compra."
        />
        <ApiErrorState
          error={syncError}
          fallback="No se pudo cargar el carrito."
          onRetry={syncCheckoutData}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Checkout"
        subtitle="Revisá tu pedido y completá tu envio antes de finalizar la compra."
      />

      <Grid container spacing={4} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <CheckoutProductSummary items={items} />
            <CheckoutShippingCard
              shippingData={shippingData}
              isCompleted={shippingCompleted}
              onFieldChange={handleShippingFieldChange}
              onSubmit={handleShippingSubmit}
              onEdit={handleShippingEdit}
            />
            {shippingCompleted && (
              <CheckoutPaymentForm
                formData={formData}
                onFieldChange={handleFieldChange}
                showValidation={showPaymentValidation}
              />
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <CheckoutPointsCard
              availablePoints={availablePoints}
              usePoints={usePoints}
              onTogglePoints={setUsePoints}
              pointsMode={pointsMode}
              onPointsModeChange={setPointsMode}
              manualPoints={manualPoints}
              onManualPointsChange={handleManualPointsChange}
              loadError={pointsError}
              onRetryLoad={handleRetryPoints}
              pointsLoading={pointsLoading}
            />
            <CheckoutPaymentDetail
              subtotal={subtotal}
              pointsDiscount={pointsDiscount}
              total={total}
              canConfirm={canConfirm && !mutating}
              validationMessage={validationMessage}
              onConfirm={handleConfirm}
            />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
