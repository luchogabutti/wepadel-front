export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const AUTH_STORAGE_KEY = 'wepadel_auth';

const getStoredToken = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw).token : null;
  } catch {
    return null;
  }
};

export const apiRequest = async (path, { method = 'GET', body, auth = false, headers = {} } = {}) => {
  const finalHeaders = { ...headers };

  if (body !== undefined) {
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
    body: body !== undefined ? JSON.stringify(body) : undefined,
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
