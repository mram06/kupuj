import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  reducerPath: baseQuery,
  baseUrl: import.meta.env.VITE_BASE_API,
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body: credentials,
      }),
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
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApi;
