import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';
import {
  applyCartAddItem,
  applyCartUpdateItem,
  applyCartRemoveItem,
  applyCartClear,
  createEmptyCart,
} from '../utils/cart';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const canUseCart = (getState, usuarioId) => {
  const user = getState().auth.user;
  return Boolean(usuarioId && user?.token && user?.rol !== 'ADMINISTRADOR');
};

const findProductForCart = (getState, productoId) => {
  const fromCatalog = getState().products.items.find((product) => product.id === productoId);
  if (fromCatalog) return fromCatalog;

  return (
    getState().cart.raw?.items?.find((item) => item.producto?.id === productoId)?.producto ?? null
  );
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (usuarioId, { getState, rejectWithValue }) => {
    if (!canUseCart(getState, usuarioId)) return null;

    try {
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/carrito`, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo cargar el carrito.')
      );
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ usuarioId, productoId, cantidad = 1 }, { getState, rejectWithValue }) => {
    try {
      await axios.post(
        `${API_BASE_URL}/usuarios/${usuarioId}/carrito/items`,
        { productoId, cantidad },
        { headers: getAuthHeaders(getState) }
      );

      const product = findProductForCart(getState, productoId);
      if (!product) {
        return rejectWithValue('No se encontró el producto para actualizar el carrito.');
      }

      const currentRaw = getState().cart.raw ?? createEmptyCart();
      return applyCartAddItem(currentRaw, product, cantidad);
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string'
          ? error
          : getAxiosErrorMessage(error, 'No se pudo agregar el producto al carrito.')
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ usuarioId, productoId, cantidad }, { getState, rejectWithValue }) => {
    try {
      await axios.put(
        `${API_BASE_URL}/usuarios/${usuarioId}/carrito/items/${productoId}`,
        { productoId, cantidad },
        { headers: getAuthHeaders(getState) }
      );

      const currentRaw = getState().cart.raw ?? createEmptyCart();
      return applyCartUpdateItem(currentRaw, productoId, cantidad);
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string'
          ? error
          : getAxiosErrorMessage(error, 'No se pudo actualizar el producto del carrito.')
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ usuarioId, productoId }, { getState, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${usuarioId}/carrito/items/${productoId}`, {
        headers: getAuthHeaders(getState),
      });

      const currentRaw = getState().cart.raw ?? createEmptyCart();
      return applyCartRemoveItem(currentRaw, productoId);
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string'
          ? error
          : getAxiosErrorMessage(error, 'No se pudo eliminar el producto del carrito.')
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (usuarioId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${usuarioId}/carrito`, {
        headers: getAuthHeaders(getState),
      });

      return applyCartClear();
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string'
          ? error
          : getAxiosErrorMessage(error, 'No se pudo vaciar el carrito.')
      );
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
        state.error = action.payload || 'No se pudo cargar el carrito.';
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
        state.error = action.payload || 'No se pudo agregar el producto al carrito.';
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
        state.error = action.payload || 'No se pudo actualizar el producto del carrito.';
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
        state.error = action.payload || 'No se pudo eliminar el producto del carrito.';
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
        state.error = action.payload || 'No se pudo vaciar el carrito.';
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
