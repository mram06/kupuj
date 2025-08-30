import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken;

    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    signup: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.signup,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: apiRoutes.auth.logout,
        method: "POST",
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: apiRoutes.auth.refresh,
        method: "POST",
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: apiRoutes.auth.resetPassword,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: apiRoutes.auth.changePassword,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
