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
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQuery,
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: apiRoutes.categories.getList,
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
