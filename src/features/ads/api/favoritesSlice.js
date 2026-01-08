import { createSlice } from "@reduxjs/toolkit";
import { adsApi } from "./advertsApi";

const initialState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favoritesList = action.payload;
    },
    addFavorite(state, action) {
      state.favoritesList.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favoritesList = state.favoritesList.filter(
        (id) => id !== action.payload
      );
    },
    clearFavorites(state) {
      state.favoritesList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(adsApi.endpoints.getFavoritesIds.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        adsApi.endpoints.getFavoritesIds.matchFulfilled,
        (state, action) => {
          state.favoritesList =
            action.payload.map((item) => item.advert_id) || [];
          state.loading = false;
        }
      )
      .addMatcher(
        adsApi.endpoints.getFavoritesIds.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        adsApi.endpoints.addToFavorites.matchFulfilled,
        (state, action) => {
          const adId = action.meta.arg.originalArgs.id;
          if (!state.favoritesList.includes(adId)) {
            state.favoritesList.push(adId);
          }
        }
      );
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
