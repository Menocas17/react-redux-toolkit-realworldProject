import { configureStore } from '@reduxjs/toolkit';
import { conduitApi } from '../services/conduit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../Features/auth/authSlice';
import feedReducer from '../Features/articles/feedSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    [conduitApi.reducerPath]: conduitApi.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(conduitApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
