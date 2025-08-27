import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api/baseApi";
import authReducer from "@/features/auth/api/authSlice";
import { authApi } from "@/features/auth/api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
