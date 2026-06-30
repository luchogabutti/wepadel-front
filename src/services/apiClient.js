import { store } from '../Redux/store';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getStoredToken = () => store.getState()?.auth?.user?.token ?? null;

const isNetworkFailure = (error) => {
  if (!error || error.name !== 'TypeError') return false;
  const message = error.message || '';
  return (
    message === 'Failed to fetch' ||
    message === 'NetworkError when attempting to fetch resource.' ||
    message === 'Load failed' ||
    message.includes('NetworkError')
  );
};

export const getApiErrorMessage = (error, fallback = 'Ocurrió un error inesperado.') => {
  if (isNetworkFailure(error)) {
    return 'No se pudo conectar con el servidor.';
  }
  return error?.message || fallback;
};

export const apiRequest = async (path, { method = 'GET', body, auth = false, headers = {} } = {}) => {
  const finalHeaders = { ...headers };
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (body !== undefined && !isFormData) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getStoredToken();
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const error = new Error(data?.message || `Error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
};
