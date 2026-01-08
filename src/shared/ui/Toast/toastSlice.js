import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

let nextId = 1;

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action) {
      const toast = {
        id: nextId++,
        type: action.payload.type || "info",
        title: action.payload.title,
        description: action.payload.description,
        duration: action.payload.duration || 3000,
      };
      state.toasts.push(toast);
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearAllToasts(state) {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearAllToasts } = toastSlice.actions;
export default toastSlice.reducer;
