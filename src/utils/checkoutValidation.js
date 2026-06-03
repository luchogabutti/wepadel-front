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

const MIN_CITY_LENGTH = 3;
const LETTER_PATTERN = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
const NUMBER_PATTERN = /\d/;

export const isAddressValid = (address) => {
  const trimmed = address.trim();
  return (
    trimmed.length > 0 && LETTER_PATTERN.test(trimmed) && NUMBER_PATTERN.test(trimmed)
  );
};

export const isCityValid = (city) => city.trim().length >= MIN_CITY_LENGTH;

export const isShippingValid = ({ address, city, postalCode }) =>
  isAddressValid(address) && isCityValid(city) && isPostalCodeValid(postalCode);

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

const EXPIRY_FORMAT = /^(0[1-9]|1[0-2])\/\d{2}$/;

export const getShippingFieldError = (field, shippingData, showErrors) => {
  if (!showErrors) return '';

  const { address, city, postalCode } = shippingData;

  switch (field) {
    case 'address':
      if (!address.trim()) return 'Ingresá la dirección de envío';
      if (!isAddressValid(address)) {
        return 'Incluí calle con letras y número (ej: Av. Libertador 1234)';
      }
      return '';
    case 'city':
      if (!city.trim()) return 'Ingresá la ciudad';
      if (!isCityValid(city)) {
        return `La ciudad debe tener al menos ${MIN_CITY_LENGTH} caracteres`;
      }
      return '';
    case 'postalCode':
      if (!postalCode.trim()) return 'Ingresá el código postal';
      if (!isPostalCodeValid(postalCode)) return 'Debe tener entre 4 y 8 números';
      return '';
    default:
      return '';
  }
};

const paymentFieldHasInput = (field, formData) => {
  const { cardName, cardNumber, expiry, cvc } = formData;
  const cardDigits = cardNumber.replace(/\D/g, '');

  switch (field) {
    case 'cardName':
      return Boolean(cardName.trim());
    case 'cardNumber':
      return cardDigits.length > 0;
    case 'expiry':
      return Boolean(expiry);
    case 'cvc':
      return Boolean(cvc);
    default:
      return false;
  }
};

const getPaymentFieldMessage = (field, formData) => {
  const { cardName, cardNumber, expiry, cvc } = formData;
  const cardDigits = cardNumber.replace(/\D/g, '');

  switch (field) {
    case 'cardName':
      if (!cardName.trim()) return 'Ingresá el nombre como figura en la tarjeta';
      if (cardName.trim().length < 3) return 'El nombre debe tener al menos 3 letras';
      return '';
    case 'cardNumber':
      if (!cardDigits) return 'Ingresá el número de tarjeta';
      if (cardDigits.length !== 16) return 'El número debe tener 16 dígitos';
      return '';
    case 'expiry':
      if (!expiry) return 'Ingresá la fecha de vencimiento';
      if (!EXPIRY_FORMAT.test(expiry)) return 'Usá el formato MM/AA (ej: 12/28)';
      if (!isExpiryValid(expiry)) return 'La tarjeta está vencida. Ingresá una fecha futura';
      return '';
    case 'cvc':
      if (!cvc) return 'Ingresá el código de seguridad';
      if (!/^\d{3,4}$/.test(cvc)) return 'El CVC debe tener 3 o 4 dígitos';
      return '';
    default:
      return '';
  }
};

export const getPaymentFieldError = (field, formData, showErrors) => {
  const message = getPaymentFieldMessage(field, formData);
  if (!message) return '';
  if (showErrors || paymentFieldHasInput(field, formData)) return message;

  return '';
};

export const getCheckoutValidationMessage = (
  shippingCompleted,
  formData,
  { usePoints, pointsMode, manualPoints, availablePoints }
) => {
  if (!shippingCompleted) {
    return 'Confirmá los datos de envío para continuar.';
  }

  if (!isPaymentFormValid(formData)) {
    return 'Completá o corregí los datos del formulario para continuar.';
  }

  if (!isPointsSelectionValid(usePoints, pointsMode, manualPoints, availablePoints)) {
    return `Ingresá entre 1 y ${availablePoints} puntos para aplicar el descuento.`;
  }

  return '';
};

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
