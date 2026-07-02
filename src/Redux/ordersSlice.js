import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser, logout, registerUser } from './authSlice';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';
import { normalizeUserFetchArg } from './fetchArgs';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const resetUserOrdersCache = (state) => {
  state.userOrdersLoaded = false;
  state.userOrdersUserId = null;
};

const resetAdminOrdersCache = (state) => {
  state.adminOrdersLoaded = false;
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { usuarioId } = normalizeUserFetchArg(arg);
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/ordenes`, {
        headers: getAuthHeaders(getState),
      });
      return { usuarioId, data: data ?? [] };
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los pedidos del usuario.')
      );
    }
  },
  {
    condition: (arg, { getState }) => {
      const { usuarioId, forceRefresh } = normalizeUserFetchArg(arg);
      if (!usuarioId) return false;
      if (forceRefresh) return true;

      const { orders } = getState();
      return !(orders.userOrdersLoaded && orders.userOrdersUserId === usuarioId);
    },
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (arg = {}, { getState, rejectWithValue }) => {
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
  },
  {
    condition: (arg, { getState }) => {
      const forceRefresh = typeof arg === 'object' && arg !== null ? Boolean(arg.forceRefresh) : false;
      if (forceRefresh) return true;
      return !getState().orders.adminOrdersLoaded;
    },
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
    userOrdersLoaded: false,
    userOrdersUserId: null,
    adminOrdersLoaded: false,
    loading: false,
    mutating: false,
    error: null,
  },
  reducers: {
    invalidateUserOrders: resetUserOrdersCache,
    invalidateAdminOrders: resetAdminOrdersCache,
  },
  extraReducers: (builder) => {
    const handleListPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleListRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'No se pudieron cargar los pedidos.';
    };

    builder
      .addCase(fetchUserOrders.pending, handleListPending)
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.userOrdersUserId = action.payload.usuarioId;
        state.userOrdersLoaded = true;
        state.adminOrdersLoaded = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        handleListRejected(state, action);
        resetUserOrdersCache(state);
        state.items = [];
      })
      .addCase(fetchAllOrders.pending, handleListPending)
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.adminOrdersLoaded = true;
        resetUserOrdersCache(state);
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        handleListRejected(state, action);
        resetAdminOrdersCache(state);
        state.items = [];
      })
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
        resetUserOrdersCache(state);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || 'No se pudo crear el pedido.';
      })

      .addCase(cancelOrder.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.mutating = false;
        state.error = null;
        state.items = state.items.map((orden) =>
          orden.id === action.payload ? { ...orden, estado: 'CANCELADA' } : orden
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || 'No se pudo cancelar el pedido.';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.items = [];
        state.current = null;
        resetUserOrdersCache(state);
        resetAdminOrdersCache(state);
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.items = [];
        state.current = null;
        resetUserOrdersCache(state);
        resetAdminOrdersCache(state);
      })
      .addCase(logout, (state) => {
        state.items = [];
        state.current = null;
        state.loading = false;
        state.mutating = false;
        state.error = null;
        resetUserOrdersCache(state);
        resetAdminOrdersCache(state);
      });
  },
});

export const { invalidateUserOrders, invalidateAdminOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
