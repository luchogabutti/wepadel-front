import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (usuarioId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/ordenes`, {
        headers: getAuthHeaders(getState),
      });
      return data ?? [];
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los pedidos del usuario.')
      );
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/ordenes`, {
        headers: getAuthHeaders(getState),
      });
      return data ?? [];
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los pedidos.')
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async ({ usuarioId, ordenId }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/ordenes/${ordenId}`, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo cargar el detalle del pedido.')
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ usuarioId, payload }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/usuarios/${usuarioId}/ordenes`, payload, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo crear el pedido.')
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ usuarioId, ordenId }, { getState, rejectWithValue }) => {
    try {
      await axios.put(`${API_BASE_URL}/usuarios/${usuarioId}/ordenes/${ordenId}/cancelar`, null, {
        headers: getAuthHeaders(getState),
      });
      return ordenId;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo cancelar el pedido.')
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    current: null,
    loading: false,
    mutating: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    const handleListPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleListFulfilled = (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    };

    const handleListRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'No se pudieron cargar los pedidos.';
      state.items = [];
    };

    builder
      .addCase(fetchUserOrders.pending, handleListPending)
      .addCase(fetchUserOrders.fulfilled, handleListFulfilled)
      .addCase(fetchUserOrders.rejected, handleListRejected)

      .addCase(fetchAllOrders.pending, handleListPending)
      .addCase(fetchAllOrders.fulfilled, handleListFulfilled)
      .addCase(fetchAllOrders.rejected, handleListRejected)

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.current = null;
        state.error = action.payload || 'No se pudo cargar el detalle del pedido.';
      })

      .addCase(createOrder.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.mutating = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || 'No se pudo crear el pedido.';
      })

      .addCase(cancelOrder.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.mutating = false;
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || 'No se pudo cancelar el pedido.';
      })

      .addCase(logout, (state) => {
        state.items = [];
        state.current = null;
        state.loading = false;
        state.mutating = false;
        state.error = null;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
