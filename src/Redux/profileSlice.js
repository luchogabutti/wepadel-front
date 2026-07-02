import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser, logout, registerUser } from './authSlice';
import { createOrder } from './ordersSlice';
import { API_BASE_URL } from '../utils/api';
import { normalizeUserFetchArg } from './fetchArgs';

const getAuthHeaders = (getState) => {
  const token = getState().auth.user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const resetProfileCache = (state) => {
  state.loadedUserId = null;
  state.profileLoaded = false;
  state.pointsLoaded = false;
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (arg, { getState }) => {
    const { usuarioId } = normalizeUserFetchArg(arg);
    const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}`, {
      headers: getAuthHeaders(getState),
    });
    return { usuarioId, data };
  },
  {
    condition: (arg, { getState }) => {
      const { usuarioId, forceRefresh } = normalizeUserFetchArg(arg);
      if (!usuarioId) return false;
      if (forceRefresh) return true;

      const { profile } = getState();
      return !(profile.profileLoaded && profile.loadedUserId === usuarioId);
    },
  }
);

export const fetchPoints = createAsyncThunk(
  'profile/fetchPoints',
  async (arg, { getState }) => {
    const { usuarioId } = normalizeUserFetchArg(arg);
    const { data } = await axios.get(`${API_BASE_URL}/usuarios/${usuarioId}/puntos`, {
      headers: getAuthHeaders(getState),
    });
    return { usuarioId, data };
  },
  {
    condition: (arg, { getState }) => {
      const { usuarioId, forceRefresh } = normalizeUserFetchArg(arg);
      if (!usuarioId) return false;
      if (forceRefresh) return true;

      const { profile } = getState();
      return !(profile.pointsLoaded && profile.loadedUserId === usuarioId);
    },
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, nombreApellido, mail }, { getState }) => {
    const { data } = await axios.put(
      `${API_BASE_URL}/usuarios/${id}`,
      { nombreApellido, mail },
      { headers: getAuthHeaders(getState) }
    );
    return data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    usuario: null,
    points: 0,
    pointsConversion: 5,
    loadedUserId: null,
    profileLoaded: false,
    pointsLoaded: false,
    loading: false,
    pointsLoading: false,
    updating: false,
    error: null,
  },
  reducers: {
    invalidateProfile(state) {
      state.profileLoaded = false;
    },
    invalidatePoints(state) {
      state.pointsLoaded = false;
    },
    invalidateProfileCache: resetProfileCache,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload.data;
        state.loadedUserId = action.payload.usuarioId;
        state.profileLoaded = true;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.profileLoaded = false;
      })
      .addCase(fetchPoints.pending, (state) => {
        state.pointsLoading = true;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.pointsLoading = false;
        state.points = action.payload.data?.cantidad ?? 0;
        state.pointsConversion = action.payload.data?.conversion ?? 5;
        state.loadedUserId = action.payload.usuarioId;
        state.pointsLoaded = true;
      })
      .addCase(fetchPoints.rejected, (state) => {
        state.pointsLoading = false;
        state.pointsLoaded = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.usuario = action.payload;
        state.profileLoaded = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.pointsLoaded = false;
      })
      .addCase(loginUser.fulfilled, resetProfileCache)
      .addCase(registerUser.fulfilled, resetProfileCache)
      .addCase(logout, (state) => {
        state.usuario = null;
        state.points = 0;
        state.pointsConversion = 5;
        state.loading = false;
        state.pointsLoading = false;
        state.updating = false;
        state.error = null;
        resetProfileCache(state);
      });
  },
});

export const { invalidateProfile, invalidatePoints, invalidateProfileCache } = profileSlice.actions;
export default profileSlice.reducer;
