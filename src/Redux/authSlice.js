import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mapAuthResponse } from '../utils/auth';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  const { data } = await axios.post(`${URL}/api/v1/auth/authenticate`, { email, password });
  return mapAuthResponse(data);
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ nombreApellido, email, password, role = 'CLIENTE' }) => {
    const { data } = await axios.post(`${URL}/api/v1/auth/register`, {
      nombreApellido,
      email,
      password,
      role,
    });
    return mapAuthResponse(data);
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
