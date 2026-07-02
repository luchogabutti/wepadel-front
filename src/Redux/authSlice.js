import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mapAuthResponse } from '../utils/auth';
import { API_BASE_URL, getAxiosErrorMessage } from '../utils/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/authenticate`, {
        email,
        password,
      });

      return mapAuthResponse(data);
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo iniciar sesión. Revisá tus datos.')
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ nombreApellido, email, password, role = 'CLIENTE' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        nombreApellido,
        email,
        password,
        role,
      });

      return mapAuthResponse(data);
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, 'No se pudo crear la cuenta. Intentá de nuevo.')
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    updateUser(state, action) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'No se pudo iniciar sesión.';
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'No se pudo crear la cuenta.';
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
