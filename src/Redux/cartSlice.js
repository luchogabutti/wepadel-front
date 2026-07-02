import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const URL = 'http://localhost:8080';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const canUseCart = (getState, usuarioId) => {
  const user = getState().auth.user;
  return Boolean(usuarioId && user?.token && user?.rol !== 'ADMINISTRADOR');
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (usuarioId, { getState, rejectWithValue }) => {
    if (!canUseCart(getState, usuarioId)) return null;

    try {
      const { data } = await axios.get(`${URL}/usuarios/${usuarioId}/carrito`, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ usuarioId, productoId, cantidad = 1 }, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.post(
        `${URL}/usuarios/${usuarioId}/carrito/items`,
        { productoId, cantidad },
        { headers: getAuthHeaders(getState) }
      );
      return dispatch(fetchCart(usuarioId)).unwrap();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ usuarioId, productoId, cantidad }, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.put(
        `${URL}/usuarios/${usuarioId}/carrito/items/${productoId}`,
        { productoId, cantidad },
        { headers: getAuthHeaders(getState) }
      );
      return dispatch(fetchCart(usuarioId)).unwrap();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ usuarioId, productoId }, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/usuarios/${usuarioId}/carrito/items/${productoId}`, {
        headers: getAuthHeaders(getState),
      });
      return dispatch(fetchCart(usuarioId)).unwrap();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (usuarioId, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/usuarios/${usuarioId}/carrito`, {
        headers: getAuthHeaders(getState),
      });
      return dispatch(fetchCart(usuarioId)).unwrap();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    raw: null,
    loading: false,
    mutating: false,
    error: null,
  },
  reducers: {
    resetCart(state) {
      state.raw = null;
      state.loading = false;
      state.mutating = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.raw = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.raw = null;
        state.error = action.payload || action.error.message;
      })
      .addCase(addCartItem.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.mutating = false;
        state.raw = action.payload;
        state.error = null;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.mutating = false;
        state.raw = action.payload;
        state.error = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.mutating = false;
        state.raw = action.payload;
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(clearCart.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.mutating = false;
        state.raw = action.payload;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(logout, (state) => {
        state.raw = null;
        state.loading = false;
        state.mutating = false;
        state.error = null;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
