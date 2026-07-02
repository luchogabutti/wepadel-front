import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
import { createDescuento, updateDescuento, deleteDescuento } from './discountsSlice';
import {
  mapProductsFromApi,
  buildProductFromMutation,
  toProductoPayload,
  saveProductImageRequest,
  getProductImagenId,
} from '../utils/products';
import { enrichProductoConDescuento } from '../utils/discountUtils';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';

const applyDescuentosToProduct = (product, descuentos) => {
  product.descuentos = descuentos;
  const enriched = enrichProductoConDescuento(product, descuentos);
  product.precioConDescuento = enriched.precioConDescuento;
  product.descuentoPorcentaje = enriched.descuentoPorcentaje;
};

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/productos`);
      return mapProductsFromApi(data);
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los productos.')
      );
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/productos`, {
        headers: getAuthHeaders(getState),
      });
      return mapProductsFromApi(data);
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los productos de administración.')
      );
    }
  }
);

export const createProductWithDetails = createAsyncThunk(
  'products/createProductWithDetails',
  async (savedProduct, { getState, rejectWithValue }) => {
    try {
      const authHeaders = getAuthHeaders(getState);
      const config = { headers: authHeaders };

      const { data: creado } = await axios.post(
        `${API_BASE_URL}/productos`,
        toProductoPayload(savedProduct),
        config
      );

      let stock = Number(savedProduct.stock) || 0;
      if (savedProduct.stock) {
        const { data: stockData } = await axios.put(
          `${API_BASE_URL}/stocks/producto/${creado.id}`,
          { cantidad: stock },
          config
        );
        stock = stockData?.cantidad ?? stock;
      }

      const imagenPrincipal = savedProduct.imageFile
        ? await saveProductImageRequest(savedProduct.imageFile, { productoId: creado.id }, authHeaders)
        : null;

      return buildProductFromMutation({
        producto: creado,
        stock,
        imagenPrincipal,
        descuentos: [],
      });
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo crear el producto.')
      );
    }
  }
);

export const updateProductWithDetails = createAsyncThunk(
  'products/updateProductWithDetails',
  async (updatedProduct, { getState, rejectWithValue }) => {
    try {
      const authHeaders = getAuthHeaders(getState);
      const config = { headers: authHeaders };
      const existing = getState().products.items.find((item) => item.id === updatedProduct.id);
      const imagenId = getProductImagenId(updatedProduct);

      const { data: actualizado } = await axios.put(
        `${API_BASE_URL}/productos/${updatedProduct.id}`,
        toProductoPayload(updatedProduct),
        config
      );

      const stock = Number(updatedProduct.stock) || 0;
      const { data: stockData } = await axios.put(
        `${API_BASE_URL}/stocks/producto/${updatedProduct.id}`,
        { cantidad: stock },
        config
      );

      let imagenPrincipal = updatedProduct.imagenPrincipal ?? null;
      if (updatedProduct.imageFile) {
        imagenPrincipal = await saveProductImageRequest(
          updatedProduct.imageFile,
          { productoId: updatedProduct.id, imagenId },
          authHeaders
        );
      } else if (imagenId && !imagenPrincipal) {
        imagenPrincipal = {
          id: imagenId,
          nombre: '',
          url: `/imagenes/${imagenId}/archivo`,
        };
      }

      return buildProductFromMutation({
        producto: actualizado,
        stock: stockData?.cantidad ?? stock,
        imagenPrincipal,
        descuentos: existing?.descuentos ?? [],
        discountFields: existing
          ? {
              precioConDescuento: existing.precioConDescuento,
              descuentoPorcentaje: existing.descuentoPorcentaje,
            }
          : {},
      });
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo actualizar el producto.')
      );
    }
  }
);

export const deleteProducto = createAsyncThunk(
  'products/deleteProducto',
  async (productId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/productos/${productId}`, {
        headers: getAuthHeaders(getState),
      });
      return productId;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo eliminar el producto.')
      );
    }
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async (changes, { getState, rejectWithValue }) => {
    try {
      const authHeaders = getAuthHeaders(getState);
      const config = { headers: authHeaders };

      await Promise.all(
        changes.map(({ id, stock }) =>
          axios.put(`${API_BASE_URL}/stocks/producto/${id}`, { cantidad: Number(stock) }, config)
        )
      );

      return changes;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo actualizar el stock.')
      );
    }
  }
);

export const toggleProductEnabled = createAsyncThunk(
  'products/toggleProductEnabled',
  async ({ product, nextEnabled }, { getState, rejectWithValue }) => {
    try {
      await axios.put(
        `${API_BASE_URL}/productos/${product.id}`,
        toProductoPayload(product, { estaHabilitado: nextEnabled }),
        { headers: getAuthHeaders(getState) }
      );

      return { id: product.id, estaHabilitado: nextEnabled };
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo cambiar el estado del producto.')
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    adminLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handleFetchPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFetchFulfilled = (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    };

    const handleFetchRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'No se pudieron cargar los productos.';
      state.items = [];
    };

    const handleAdminFetchFulfilled = (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
      state.adminLoaded = true;
    };

    const handleAdminFetchRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'No se pudieron cargar los productos de administración.';
      state.items = [];
      state.adminLoaded = false;
    };

    const handleMutationPending = (state) => {
      state.error = null;
    };

    builder
      .addCase(fetchProducts.pending, handleFetchPending)
      .addCase(fetchProducts.fulfilled, handleFetchFulfilled)
      .addCase(fetchProducts.rejected, handleFetchRejected)

      .addCase(fetchAdminProducts.pending, handleFetchPending)
      .addCase(fetchAdminProducts.fulfilled, handleAdminFetchFulfilled)
      .addCase(fetchAdminProducts.rejected, handleAdminFetchRejected)

      .addCase(createProductWithDetails.pending, handleMutationPending)
      .addCase(createProductWithDetails.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createProductWithDetails.rejected, (state, action) => {
        state.error = action.payload || 'No se pudo crear el producto.';
      })

      .addCase(updateProductWithDetails.pending, handleMutationPending)
      .addCase(updateProductWithDetails.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProductWithDetails.rejected, (state, action) => {
        state.error = action.payload || 'No se pudo actualizar el producto.';
      })

      .addCase(deleteProducto.pending, handleMutationPending)
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProducto.rejected, (state, action) => {
        state.error = action.payload || 'No se pudo eliminar el producto.';
      })

      .addCase(updateProductStock.pending, handleMutationPending)
      .addCase(updateProductStock.fulfilled, (state, action) => {
        action.payload.forEach(({ id, stock }) => {
          const item = state.items.find((product) => product.id === id);
          if (item) {
            item.stock = stock;
          }
        });
        state.error = null;
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.error = action.payload || 'No se pudo actualizar el stock.';
      })

      .addCase(toggleProductEnabled.pending, handleMutationPending)
      .addCase(toggleProductEnabled.fulfilled, (state, action) => {
        const item = state.items.find((product) => product.id === action.payload.id);
        if (item) {
          item.estaHabilitado = action.payload.estaHabilitado;
        }
        state.error = null;
      })
      .addCase(toggleProductEnabled.rejected, (state, action) => {
        state.error = action.payload || 'No se pudo cambiar el estado del producto.';
      })

      .addCase(createDescuento.fulfilled, (state, action) => {
        const { productoId, descuento } = action.payload;
        const product = state.items.find((item) => item.id === productoId);
        if (!product) return;
        applyDescuentosToProduct(product, [...(product.descuentos ?? []), descuento]);
      })

      .addCase(updateDescuento.fulfilled, (state, action) => {
        const { productoId, previousProductoId, descuento } = action.payload;

        if (previousProductoId && previousProductoId !== productoId) {
          const previousProduct = state.items.find((item) => item.id === previousProductoId);
          if (previousProduct) {
            applyDescuentosToProduct(
              previousProduct,
              (previousProduct.descuentos ?? []).filter((item) => item.id !== descuento.id)
            );
          }

          const product = state.items.find((item) => item.id === productoId);
          if (product) {
            applyDescuentosToProduct(product, [...(product.descuentos ?? []), descuento]);
          }
          return;
        }

        const product = state.items.find((item) => item.id === productoId);
        if (!product) return;

        const descuentos = (product.descuentos ?? []).map((item) =>
          item.id === descuento.id ? descuento : item
        );

        applyDescuentosToProduct(product, descuentos);
      })

      .addCase(deleteDescuento.fulfilled, (state, action) => {
        const { id, productoId } = action.payload;
        if (!productoId) return;

        const product = state.items.find((item) => item.id === productoId);
        if (!product) return;

        applyDescuentosToProduct(
          product,
          (product.descuentos ?? []).filter((descuento) => descuento.id !== id)
        );
      })

      .addCase(logout, (state) => {
        state.adminLoaded = false;
      });
  },
});

export default productsSlice.reducer;
