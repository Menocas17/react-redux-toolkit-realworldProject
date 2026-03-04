import { configureStore } from '@reduxjs/toolkit';
import { conduitApi } from '../services/conduit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [conduitApi.reducerPath]: conduitApi.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(conduitApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
