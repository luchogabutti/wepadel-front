import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  mapProductsFromApi,
  buildProductFromMutation,
  toProductoPayload,
  saveProductImageRequest,
  getProductImagenId,
} from '../utils/products';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await axios.get(`${URL}/productos`);
  return mapProductsFromApi(data);
});

export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async (_, { getState }) => {
    const { data } = await axios.get(`${URL}/productos`, {
      headers: getAuthHeaders(getState),
    });
    return mapProductsFromApi(data);
  }
);

export const createProductWithDetails = createAsyncThunk(
  'products/createProductWithDetails',
  async (savedProduct, { getState }) => {
    const authHeaders = getAuthHeaders(getState);
    const config = { headers: authHeaders };

    const { data: creado } = await axios.post(
      `${URL}/productos`,
      toProductoPayload(savedProduct),
      config
    );

    let stock = Number(savedProduct.stock) || 0;
    if (savedProduct.stock) {
      const { data: stockData } = await axios.put(
        `${URL}/stocks/producto/${creado.id}`,
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
  }
);

export const updateProductWithDetails = createAsyncThunk(
  'products/updateProductWithDetails',
  async (updatedProduct, { getState }) => {
    const authHeaders = getAuthHeaders(getState);
    const config = { headers: authHeaders };
    const existing = getState().products.items.find((item) => item.id === updatedProduct.id);
    const imagenId = getProductImagenId(updatedProduct);

    const { data: actualizado } = await axios.put(
      `${URL}/productos/${updatedProduct.id}`,
      toProductoPayload(updatedProduct),
      config
    );

    const stock = Number(updatedProduct.stock) || 0;
    const { data: stockData } = await axios.put(
      `${URL}/stocks/producto/${updatedProduct.id}`,
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
  }
);

export const deleteProducto = createAsyncThunk(
  'products/deleteProducto',
  async (productId, { getState }) => {
    await axios.delete(`${URL}/productos/${productId}`, {
      headers: getAuthHeaders(getState),
    });
    return productId;
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async (changes, { getState }) => {
    const authHeaders = getAuthHeaders(getState);
    const config = { headers: authHeaders };

    await Promise.all(
      changes.map(({ id, stock }) =>
        axios.put(`${URL}/stocks/producto/${id}`, { cantidad: Number(stock) }, config)
      )
    );

    return changes;
  }
);

export const toggleProductEnabled = createAsyncThunk(
  'products/toggleProductEnabled',
  async ({ product, nextEnabled }, { getState }) => {
    await axios.put(
      `${URL}/productos/${product.id}`,
      toProductoPayload(product, { estaHabilitado: nextEnabled }),
      { headers: getAuthHeaders(getState) }
    );

    return { id: product.id, estaHabilitado: nextEnabled };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
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
      state.error = action.error.message;
      state.items = [];
    };

    builder
      .addCase(fetchProducts.pending, handleFetchPending)
      .addCase(fetchProducts.fulfilled, handleFetchFulfilled)
      .addCase(fetchProducts.rejected, handleFetchRejected)
      .addCase(fetchAdminProducts.pending, handleFetchPending)
      .addCase(fetchAdminProducts.fulfilled, handleFetchFulfilled)
      .addCase(fetchAdminProducts.rejected, handleFetchRejected)
      .addCase(createProductWithDetails.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProductWithDetails.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        action.payload.forEach(({ id, stock }) => {
          const item = state.items.find((product) => product.id === id);
          if (item) {
            item.stock = stock;
          }
        });
      })
      .addCase(toggleProductEnabled.fulfilled, (state, action) => {
        const item = state.items.find((product) => product.id === action.payload.id);
        if (item) {
          item.estaHabilitado = action.payload.estaHabilitado;
        }
      });
  },
});

export default productsSlice.reducer;
