import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/api/authSlice";
import favoritesReducer from "@/features/ads/api/favoritesSlice";
import toastReducer from "@/shared/ui/Toast/toastSlice";
import modalReducer from "@/shared/ui/Modal/modalSlice";
import { authApi } from "@/features/auth/api/authApi";
import { adsApi } from "@/features/ads/api/advertsApi";
import { categoriesApi } from "@/features/categories/api/categoriesApi";

export const store = configureStore({
  reducer: {
    // [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    toast: toastReducer,
    modal: modalReducer,
    authApi: authApi.reducer,
    adsApi: adsApi.reducer,
    categoriesApi: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adsApi.middleware,
      categoriesApi.middleware
    ),
});
