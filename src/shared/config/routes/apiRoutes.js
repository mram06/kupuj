export const apiRoutes = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
    updateProfile: "/auth/update-profile",
  },
  ads: {
    getList: (query) => `/ads${query}`,
    getTopList: "/ads/top",
    getListByUserId: (id) => `/ads/user/${id}`,
    getById: (id) => `/ads/${id}`,
    create: "/ads/create",
    update: (id) => `/ads/${id}`,
    delete: (id) => `/ads/${id}`,
    getFavorites: "/favorites",
    getFavoritesIds: "/favorites/ids",
    addToFavorites: (id) => `/favorites/add/${id}`,
  },
  categories: {
    getList: "/categories",
  },
};
