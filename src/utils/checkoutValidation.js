export const formatPostalCode = (value) => value.replace(/\D/g, '').slice(0, 8);

export const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

export const formatCardExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const formatCvc = (value) => value.replace(/\D/g, '').slice(0, 4);

export const formatCardName = (value) =>
  value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').slice(0, 50);

export const isPostalCodeValid = (postalCode) => /^\d{4,8}$/.test(postalCode);

export const isShippingValid = ({ address, city, postalCode }) =>
  Boolean(address.trim() && city.trim() && isPostalCodeValid(postalCode));

export const isExpiryValid = (expiry) => {
  const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return expiryDate >= currentMonth;
};

export const isPaymentFormValid = ({ cardName, cardNumber, expiry, cvc }) => {
  const cardDigits = cardNumber.replace(/\D/g, '');

  return (
    cardName.trim().length >= 3 &&
    cardDigits.length === 16 &&
    isExpiryValid(expiry) &&
    /^\d{3,4}$/.test(cvc)
  );
};

export const formatManualPoints = (value, availablePoints) => {
  const digits = value.replace(/\D/g, '');

  if (digits === '') return '';

  const numericValue = Math.min(parseInt(digits, 10), availablePoints);
  return String(numericValue);
};

export const isPointsSelectionValid = (usePoints, pointsMode, manualPoints, availablePoints) => {
  if (!usePoints) return true;
  if (pointsMode === 'all') return true;

  const parsed = parseInt(manualPoints, 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= availablePoints;
};

export const getPointsDiscount = (usePoints, pointsMode, manualPoints, availablePoints) => {
  if (!usePoints) return 0;
  if (pointsMode === 'all') return availablePoints;
  if (!isPointsSelectionValid(usePoints, pointsMode, manualPoints, availablePoints)) return 0;

  return parseInt(manualPoints, 10);
};

export const isCheckoutReady = (
  shippingCompleted,
  formData,
  { usePoints, pointsMode, manualPoints, availablePoints }
) =>
  shippingCompleted &&
  isPaymentFormValid(formData) &&
  isPointsSelectionValid(usePoints, pointsMode, manualPoints, availablePoints);

export const formatShippingField = (field, value) => {
  if (field === 'postalCode') return formatPostalCode(value);
  return value;
};

export const formatPaymentField = (field, value) => {
  switch (field) {
    case 'cardName':
      return formatCardName(value);
    case 'cardNumber':
      return formatCardNumber(value);
    case 'expiry':
      return formatCardExpiry(value);
    case 'cvc':
      return formatCvc(value);
    default:
      return value;
  }
};
