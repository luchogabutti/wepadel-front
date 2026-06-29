export const formatCartPrice = (amount) => `$${amount.toFixed(2)}`;

export const formatCheckoutPrice = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
