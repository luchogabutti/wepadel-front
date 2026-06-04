import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CheckoutProductSummary } from '../components/checkout/CheckoutProductSummary/CheckoutProductSummary';
import { CheckoutShippingCard } from '../components/checkout/CheckoutShippingCard/CheckoutShippingCard';
import { CheckoutPaymentForm } from '../components/checkout/CheckoutPaymentForm/CheckoutPaymentForm';
import { CheckoutPointsCard } from '../components/checkout/CheckoutPointsCard/CheckoutPointsCard';
import { CheckoutPaymentDetail } from '../components/checkout/CheckoutPaymentDetail/CheckoutPaymentDetail';
import {
  CHECKOUT_ITEMS,
  CHECKOUT_SUMMARY,
  AVAILABLE_POINTS,
} from '../data/cartData';
import {
  isCheckoutReady,
  isShippingValid,
  getPointsDiscount,
  getCheckoutValidationMessage,
} from '../utils/checkoutValidation';
export const CheckoutPage = () => {
  const navigate = useNavigate();

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

  const pointsState = {
    usePoints,
    pointsMode,
    manualPoints,
    availablePoints: AVAILABLE_POINTS,
  };

  const subtotal = CHECKOUT_SUMMARY.subtotal;

  const pointsDiscount = getPointsDiscount(
    usePoints,
    pointsMode,
    manualPoints,
    AVAILABLE_POINTS
  );

  const total = Math.max(subtotal - pointsDiscount, 0);

  const canConfirm = isCheckoutReady(shippingCompleted, formData, pointsState);

  const validationMessage = getCheckoutValidationMessage(
    shippingCompleted,
    formData,
    pointsState
  );

  const shouldShowPaymentValidation = showPaymentValidation;

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

  const handleConfirm = () => {
    if (!canConfirm) {
      setShowPaymentValidation(true);
      return;
    }

    const orderId = `WP-${Math.floor(10000 + Math.random() * 90000)}`;
    navigate(`/checkout/confirmacion/${orderId}`, {
      state: { pointsEarned: 120 },
    });
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
            <CheckoutProductSummary items={CHECKOUT_ITEMS} />
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
                showValidation={shouldShowPaymentValidation}
              />
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <CheckoutPointsCard
              availablePoints={AVAILABLE_POINTS}
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
              canConfirm={canConfirm}
              validationMessage={validationMessage}
              onConfirm={handleConfirm}
            />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
