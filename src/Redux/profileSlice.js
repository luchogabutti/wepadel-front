import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (usuarioId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}`, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo cargar el perfil.')
      );
    }
  }
);

export const fetchPoints = createAsyncThunk(
  'profile/fetchPoints',
  async (usuarioId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/puntos`, {
        headers: getAuthHeaders(getState),
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudieron cargar los puntos.')
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, nombreApellido, mail }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/usuarios/${id}`,
        { nombreApellido, mail },
        { headers: getAuthHeaders(getState) }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo actualizar el perfil.')
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    usuario: null,
    points: 0,
    pointsConversion: 5,
    loading: false,
    pointsLoading: false,
    updating: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.usuario = null;
      state.points = 0;
      state.pointsConversion = 5;
      state.loading = false;
      state.pointsLoading = false;
      state.updating = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'No se pudo cargar el perfil.';
        state.usuario = null;
      })

      .addCase(fetchPoints.pending, (state) => {
        state.pointsLoading = true;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.pointsLoading = false;
        state.points = action.payload?.cantidad ?? 0;
        state.pointsConversion = action.payload?.conversion ?? 5;
      })
      .addCase(fetchPoints.rejected, (state, action) => {
        state.pointsLoading = false;
        state.points = 0;
        state.error = action.payload || 'No se pudieron cargar los puntos.';
      })

      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.usuario = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || 'No se pudo actualizar el perfil.';
      })

      .addCase(logout, (state) => {
        state.usuario = null;
        state.points = 0;
        state.pointsConversion = 5;
        state.loading = false;
        state.pointsLoading = false;
        state.updating = false;
        state.error = null;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
