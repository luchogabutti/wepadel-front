import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { CheckoutProductSummary } from '../components/checkout/CheckoutProductSummary/CheckoutProductSummary';
import { CheckoutShippingCard } from '../components/checkout/CheckoutShippingCard/CheckoutShippingCard';
import { CheckoutPaymentForm } from '../components/checkout/CheckoutPaymentForm/CheckoutPaymentForm';
import { CheckoutPointsCard } from '../components/checkout/CheckoutPointsCard/CheckoutPointsCard';
import { CheckoutPaymentDetail } from '../components/checkout/CheckoutPaymentDetail/CheckoutPaymentDetail';
import { Footer } from '../components/general/footer/Footer';
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 6 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, color: '#e5e1eb', fontSize: { xs: 28, md: 32 }, mb: 1 }}
          >
            Checkout
          </Typography>
          <Typography sx={{ color: '#c2c6d8', fontSize: 16 }}>
            Revisá tu pedido y completá tu envio antes de finalizar la compra.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
