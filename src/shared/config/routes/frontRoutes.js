// import { roles } from "../roles";

export const frontRoutes = {
  pages: {
    // НазваСторінки: {
    //   path: 'шлях_у_роутері',
    //   navigationPath: 'шлях_для_програмної_навігації',
    //   meta: {
    //     title: 'заголовок_сторінки',
    //     isInMenu: чи треба у головному мені відповідний пункт,
    //     requireAuth: чи потребує авторизації,
    //     roles: [перелік ролей користувачів, які мають доступ],
    //   },
    // },
    HomePage: {
      path: "",
      navigationPath: "/",
      meta: {
        title: "home",
        requireAuth: false,
      },
    },
    AddAdPage: {
      path: "add",
      navigationPath: "/add",
      meta: {
        title: "add",
        requireAuth: true,
      },
    },
    // NotFoundPage: {
    //   path: "*",
    //   meta: {
    //     title: "Not Found",
    //     isInMenu: false,
    //     requireAuth: false,
    //   },
    // },
    // ForbiddenPage: {
    //   path: "forbidden",
    //   navigationPath: "/forbidden",
    //   meta: {
    //     title: "Forbidden",
    //     isInMenu: false,
    //     requireAuth: false,
    //   },
    // },
  },
};

export function getPagesObjectList() {
  const pagesList = Object.keys(frontRoutes.pages);
  return pagesList.map((page) => frontRoutes.pages[page]);
}
