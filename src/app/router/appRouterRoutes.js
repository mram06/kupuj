const pages = import.meta.glob("../../pages/*.jsx", { eager: false });
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

const pagesList = Object.keys(frontRoutes.pages);

export const appRouterRoutes = pagesList.map((page) => ({
  ...frontRoutes.pages[page],
  lazy: async () => {
    // щоб коректно працювало після деплою
    const importPage = pages[`../../pages/${page}.jsx`];
    return { Component: (await importPage()).default };
  },
}));
