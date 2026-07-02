import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mapCategorias } from '../utils/categories';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';

export const DEFAULT_CATEGORIA_ID = 'paletas';
export const DEFAULT_CATALOG_PATH = '/catalogo/paletas';

export const fetchCategorias = createAsyncThunk(
  'categories/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/categorias`);
      return mapCategorias(data);
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar las categorías.')
      );
    }
  }
);

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
        state.error = action.payload || 'No se pudieron cargar las categorías.';
        state.items = [];
      });
  },
});

export default categoriesSlice.reducer;

export const getDefaultCatalogPath = (items) =>
  items.find((cat) => cat.id === DEFAULT_CATEGORIA_ID)?.path ?? DEFAULT_CATALOG_PATH;
