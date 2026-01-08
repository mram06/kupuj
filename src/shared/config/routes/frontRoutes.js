// import { roles } from "../roles";

import { ResetPasswordGetTokenForm } from "@/features/auth/reset-password/reset-password-get-token-form";

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
    EditAdPage: {
      path: "ads/:id/edit",
      navigationPath: (id) => `/ads/${id}/edit`,
      meta: {
        title: "edit",
        requireAuth: true,
      },
    },
    AdsPage: {
      path: "ads",
      navigationPath: (categoryId = "", search = "") =>
        `ads?category=${categoryId}&search=${search}`,
      meta: {
        title: "ads",
        requireAuth: false,
      },
    },
    AdPage: {
      path: "ads/:id",
      navigationPath: (id) => `/ads/${id}`,
      meta: {
        title: "ad",
        requireAuth: false,
      },
    },

    NotFoundPage: {
      path: "*",
      meta: {
        title: "found",
        requireAuth: false,
      },
    },
    LoginPage: {
      path: "login",
      navigationPath: "/login",
      meta: {
        title: "login",
        requireAuth: false,
      },
    },
    SignupPage: {
      path: "signup",
      navigationPath: "/signup",
      meta: {
        title: "login",
        requireAuth: false,
      },
    },
    ResetPasswordPage: {
      path: "reset-password",
      navigationPath: "/reset-password",
      meta: {
        title: "resetPassword",
        requireAuth: false,
      },
      children: [
        {
          index: true,
          navigationPath: "/reset-password",
          Component: ResetPasswordGetTokenForm,
          meta: {
            title: "resetPasswordGetToken",
            requireAuth: false,
          },
        },
      ],
    },
    ProfilePage: {
      path: "profile",
      navigationPath: "/profile",
      meta: {
        title: "profile",
        requireAuth: true,
      },
    },
    AboutPage: {
      path: "about",
      navigationPath: "/about",
      meta: {
        title: "about",
        requireAuth: false,
      },
    },

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
