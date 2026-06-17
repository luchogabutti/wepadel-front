import { apiRequest } from './apiClient';

export const login = ({ email, password }) =>
  apiRequest('/api/v1/auth/authenticate', {
    method: 'POST',
    body: { email, password },
  });

export const register = ({ nombreApellido, email, password, role = 'CLIENTE' }) =>
  apiRequest('/api/v1/auth/register', {
    method: 'POST',
    body: { nombreApellido, email, password, role },
  });
