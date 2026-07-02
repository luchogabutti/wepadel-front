import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const URL = 'http://localhost:8080';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const toApiDateTime = (value, time) => {
  if (!value) return value;
  if (String(value).includes('T')) return value;
  return `${value}T${time}`;
};

const buildDescuentoBody = (descuento, overrides = {}) => ({
  productoId: descuento.producto?.id ?? descuento.productoId,
  porcentaje: Number(descuento.porcentaje),
  fechaInicio: toApiDateTime(descuento.fechaInicio, '00:00:00'),
  fechaFin: toApiDateTime(descuento.fechaFin, '23:59:59'),
  activo: descuento.activo !== false,
  ...overrides,
});

export const createDescuento = createAsyncThunk(
  'discounts/createDescuento',
  async (descuento, { getState }) => {
    await axios.post(`${URL}/descuentos`, buildDescuentoBody(descuento), {
      headers: getAuthHeaders(getState),
    });
  }
);

export const updateDescuento = createAsyncThunk(
  'discounts/updateDescuento',
  async ({ id, descuento, overrides = {} }, { getState }) => {
    await axios.put(`${URL}/descuentos/${id}`, buildDescuentoBody(descuento, overrides), {
      headers: getAuthHeaders(getState),
    });
  }
);

export const deleteDescuento = createAsyncThunk(
  'discounts/deleteDescuento',
  async (id, { getState }) => {
    await axios.delete(`${URL}/descuentos/${id}`, {
      headers: getAuthHeaders(getState),
    });
    return id;
  }
);

const discountsSlice = createSlice({
  name: 'discounts',
  initialState: {
    mutating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handleMutationPending = (state) => {
      state.mutating = true;
      state.error = null;
    };
    const handleMutationFulfilled = (state) => {
      state.mutating = false;
      state.error = null;
    };
    const handleMutationRejected = (state, action) => {
      state.mutating = false;
      state.error = action.error.message;
    };

    builder
      .addCase(createDescuento.pending, handleMutationPending)
      .addCase(createDescuento.fulfilled, handleMutationFulfilled)
      .addCase(createDescuento.rejected, handleMutationRejected)
      .addCase(updateDescuento.pending, handleMutationPending)
      .addCase(updateDescuento.fulfilled, handleMutationFulfilled)
      .addCase(updateDescuento.rejected, handleMutationRejected)
      .addCase(deleteDescuento.pending, handleMutationPending)
      .addCase(deleteDescuento.fulfilled, handleMutationFulfilled)
      .addCase(deleteDescuento.rejected, handleMutationRejected)
      .addCase(logout, (state) => {
        state.mutating = false;
        state.error = null;
      });
  },
});

export default discountsSlice.reducer;
