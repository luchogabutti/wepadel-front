import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CheckoutProductSummary } from '../components/checkout/CheckoutProductSummary/CheckoutProductSummary';
import { CheckoutShippingCard } from '../components/checkout/CheckoutShippingCard/CheckoutShippingCard';
import { CheckoutPaymentForm } from '../components/checkout/CheckoutPaymentForm/CheckoutPaymentForm';
import { CheckoutPointsCard } from '../components/checkout/CheckoutPointsCard/CheckoutPointsCard';
import { CheckoutPaymentDetail } from '../components/checkout/CheckoutPaymentDetail/CheckoutPaymentDetail';
import { useCart } from '../context/CartContext';
import { useSelector } from 'react-redux';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import { getPuntos } from '../services/puntosService';
import { createOrden } from '../services/ordenesService';
import {
  isCheckoutReady,
  isShippingValid,
  getPointsDiscount,
  getCheckoutValidationMessage,
} from '../utils/checkoutValidation';

const MONTO_ENVIO = 0;

export const CheckoutView = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { items, subtotal, refresh } = useCart();
  const { notifyError } = useAppSnackbar();
  const usuarioId = user?.id;

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

  const [puntos, setPuntos] = useState({ cantidad: 0, conversion: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!usuarioId) return;
    getPuntos(usuarioId)
      .then((data) => {
        setPuntos({
          cantidad: data?.cantidad ?? 0,
          conversion: data?.conversion ?? 5,
        });
      })
      .catch((err) => console.error('Error al obtener puntos:', err));
  }, [usuarioId]);

  const availablePoints = puntos.cantidad;
  const conversion = puntos.conversion || 1;

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
  const canConfirm = hasItems && isCheckoutReady(shippingCompleted, formData, pointsState);

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

    setSubmitting(true);

    try {
      const payload = {
        usuario: usuarioId,
        direccion: `${shippingData.address}, ${shippingData.city}`,
        cp: shippingData.postalCode,
        montoEnvio: MONTO_ENVIO,
        usaPuntos: usePoints && puntosUsados > 0,
        puntosUsados: usePoints ? puntosUsados : 0,
      };

      const orden = await createOrden(usuarioId, payload);
      await refresh();
      navigate(`/checkout/confirmacion/${orden.id}`, {
        state: { pointsEarned: orden.puntosGenerados },
      });
    } catch (err) {
      const message = err.message || 'No se pudo confirmar la compra. Intentá nuevamente.';
      notifyError(message);
    } finally {
      setSubmitting(false);
    }
  };

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
            />
            <CheckoutPaymentDetail
              subtotal={subtotal}
              pointsDiscount={pointsDiscount}
              total={total}
              canConfirm={canConfirm && !submitting}
              validationMessage={validationMessage}
              onConfirm={handleConfirm}
            />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
