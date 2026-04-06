import {
  createSlice,
  isRejectedWithValue,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { AuthState } from './types';
import { conduitApi } from '../../services/conduit';
import { type ConduitError } from '../../services/types';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        conduitApi.endpoints.login.matchFulfilled(action) ||
        conduitApi.endpoints.register.matchFulfilled(action),

      (state, action) => {
        const token = action.payload.user.token;
        state.token = token;
        localStorage.setItem('token', token);
      },
    );

    builder.addMatcher(isRejectedWithValue, (state, action) => {
      const payload = action.payload as ConduitError | undefined;

      if (payload?.status === 401) {
        state.token = null;
        localStorage.removeItem('token');
      }
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
