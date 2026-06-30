import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mapCategorias } from '../utils/categories';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const DEFAULT_CATEGORIA_ID = 'paletas';
export const DEFAULT_CATALOG_PATH = '/catalogo/paletas';

export const fetchCategorias = createAsyncThunk('categories/fetchCategorias', async () => {
  const { data } = await axios.get(`${URL}/categorias`);
  return mapCategorias(data);
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export default categoriesSlice.reducer;

export const getDefaultCatalogPath = (items) =>
  items.find((cat) => cat.id === DEFAULT_CATEGORIA_ID)?.path ?? DEFAULT_CATALOG_PATH;
