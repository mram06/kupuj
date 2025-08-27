import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/api/authSlice";
import { authApi } from "@/features/auth/api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
    authApi: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
