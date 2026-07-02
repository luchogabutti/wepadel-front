export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const PLACEHOLDER_IMG = 'https://placehold.co/400x400?text=WePadel';

const isNetworkFailure = (error) => {
  if (!error) return false;
  if (error.code === 'ERR_NETWORK') return true;
  if (error.name !== 'TypeError') return false;
  const message = error.message || '';
  return (
    message === 'Failed to fetch' ||
    message === 'NetworkError when attempting to fetch resource.' ||
    message === 'Load failed' ||
    message.includes('NetworkError')
  );
};

const getStatusMessage = (status, serverMessage) => {
  if (status === 401) return 'Email o contraseña incorrectos.';
  if (status === 403) return 'No tenés permiso para realizar esta acción.';
  if (status === 404) return 'No se encontró el recurso solicitado.';
  if (status === 409) return serverMessage || 'Ya existe una cuenta con ese email.';
  if (status >= 500) return 'Error del servidor. Intentá más tarde.';
  return null;
};

export const getAxiosErrorMessage = (error, fallback = 'Ocurrió un error inesperado.') => {
  if (isNetworkFailure(error)) {
    return 'No se pudo conectar con el servidor.';
  }

  const status = error?.response?.status;
  const data = error?.response?.data;
  const serverMessage =
    (typeof data === 'string' ? data : null) ||
    data?.message ||
    data?.error ||
    data?.detail;

  const statusMessage = status ? getStatusMessage(status, serverMessage) : null;
  if (statusMessage) return statusMessage;

  if (typeof serverMessage === 'string' && serverMessage.trim()) {
    return serverMessage;
  }

  return fallback;
};

export const getApiErrorMessage = (error, fallback = 'Ocurrió un error inesperado.') => {
  if (error?.isAxiosError || error?.response) {
    return getAxiosErrorMessage(error, fallback);
  }
  if (isNetworkFailure(error)) {
    return 'No se pudo conectar con el servidor.';
  }
  return error?.message || fallback;
};
