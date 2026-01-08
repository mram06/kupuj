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
export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: baseQuery,
  tagTypes: ["Ad", "Favorites"],
  endpoints: (build) => ({
    getAdverts: build.query({
      query: ({ query, page }) => ({
        url: apiRoutes.ads.getList(`?${query}&page=${page}`),
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Ad"],
    }),

    getTopAdverts: build.query({
      query: () => ({
        url: apiRoutes.ads.getTopList,
      }),
      providesTags: ["Ad"],
    }),

    getAdvertsByUserId: build.query({
      query: ({ id }) => ({
        url: apiRoutes.ads.getListByUserId(id),
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Ad"],
    }),

    getAdvertById: build.query({
      query: ({ id }) => ({
        url: apiRoutes.ads.getById(id),
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Ad"],
    }),

    create: build.mutation({
      query: (data) => ({
        url: apiRoutes.ads.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    }),

    update: build.mutation({
      query: ({ id, data }) => ({
        url: apiRoutes.ads.update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    }),

    delete: build.mutation({
      query: ({ id }) => ({
        url: apiRoutes.ads.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Ad"],
    }),

    getFavorites: build.query({
      query: () => ({
        url: apiRoutes.ads.getFavorites,
      }),
      providesTags: ["Favorites"],
    }),

    getFavoritesIds: build.query({
      query: () => ({
        url: apiRoutes.ads.getFavoritesIds,
      }),
      providesTags: ["Favorites"],
    }),

    addToFavorites: build.mutation({
      query: ({ id }) => ({
        url: apiRoutes.ads.addToFavorites(id),
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetAdvertsQuery,
  useGetTopAdvertsQuery,
  useGetAdvertsByUserIdQuery,
  useGetAdvertByIdQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetFavoritesQuery,
  useGetFavoritesIdsQuery,
  useAddToFavoritesMutation,
} = adsApi;
