export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const AUTH_STORAGE_KEY = 'wepadel_auth';

export const getStoredAuth = () => {
  try {
    const raw =
      localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getStoredToken = () => getStoredAuth()?.token ?? null;

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

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const error = new Error(data?.message || `Error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
};
