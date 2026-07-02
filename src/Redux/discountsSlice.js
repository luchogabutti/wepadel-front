import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
import { API_BASE_URL } from '../utils/api';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const toApiDateTime = (value, time) => {
  if (!value) return value;
  if (String(value).includes('T')) return value;
  return `${value}T${time}`;
};

const parseIdFromLocation = (location) => {
  if (!location) return null;
  const id = Number(String(location).split('/').pop());
  return Number.isFinite(id) ? id : null;
};

const buildDescuentoBody = (descuento, overrides = {}) => ({
  productoId: descuento.producto?.id ?? descuento.productoId,
  porcentaje: Number(descuento.porcentaje),
  fechaInicio: toApiDateTime(descuento.fechaInicio, '00:00:00'),
  fechaFin: toApiDateTime(descuento.fechaFin, '23:59:59'),
  activo: descuento.activo !== false,
  ...overrides,
});

const findProductoIdByDescuento = (products, descuentoId) => {
  for (const product of products) {
    if ((product.descuentos ?? []).some((descuento) => descuento.id === descuentoId)) {
      return product.id;
    }
  }
  return null;
};

export const createDescuento = createAsyncThunk(
  'discounts/createDescuento',
  async (descuento, { getState }) => {
    const body = buildDescuentoBody(descuento);
    const { data, headers } = await axios.post(`${API_BASE_URL}/descuentos`, body, {
      headers: getAuthHeaders(getState),
    });

    const id = data?.id ?? parseIdFromLocation(headers?.location);

    return {
      productoId: body.productoId,
      descuento: data ?? { id, ...body },
    };
  }
);

export const updateDescuento = createAsyncThunk(
  'discounts/updateDescuento',
  async ({ id, descuento, overrides = {} }, { getState }) => {
    const products = getState().products.items;
    const previousProductoId =
      findProductoIdByDescuento(products, id) ??
      descuento.producto?.id ??
      descuento.productoId;
    const body = buildDescuentoBody(descuento, overrides);

    const { data } = await axios.put(`${API_BASE_URL}/descuentos/${id}`, body, {
      headers: getAuthHeaders(getState),
    });

    return {
      productoId: body.productoId,
      previousProductoId,
      descuento: data ?? { id, ...body },
    };
  }
);

export const deleteDescuento = createAsyncThunk(
  'discounts/deleteDescuento',
  async (id, { getState }) => {
    const productoId = findProductoIdByDescuento(getState().products.items, id);

    await axios.delete(`${API_BASE_URL}/descuentos/${id}`, {
      headers: getAuthHeaders(getState),
    });

    return { id, productoId };
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
