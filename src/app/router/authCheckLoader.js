import { store } from "@/app/store/store";
import { authApi } from "@/features/auth/api/authApi";
import { redirect } from "react-router";

export const authCheckLoader =
  ({ refreshMutex }) =>
  async (route) => {
    // Визначаємо meta для поточного маршруту
    const meta = route?.meta;

    // Базова структура даних, що повертається
    let user = store.getState()?.auth?.user;

    const requireAuth = meta?.requireAuth;

    const allowedRoles = meta?.roles || [];

    const loaderData = {
      user,
      isAuthenticated: !!user,
    };

    //Перевірка прав доступу до сторінки
    if (requireAuth) {
      // Перевіряємо, чи не виконується вже оновлення токену
      if (refreshMutex.isLocked()) {
        await refreshMutex.waitForUnlock();
        user = store.getState()?.auth?.user;
        loaderData.user = user;
        loaderData.isAuthenticated = !!user;
      }

      if (!user) {
        // Зберігаємо цільову сторінку у query параметрі
        const targetPath = route?.navigationPath || "/";

        const release = await refreshMutex.acquire();
        try {
          const result = await store.dispatch(
            authApi.endpoints.refresh.initiate()
          );

          if (result?.data && result.data.uid) {
            user = result.data;
          } else {
            throw new Error("Not authenticated");
          }
          loaderData.user = user;
          loaderData.isAuthenticated = !!user;

          if (!user) {
            throw redirect(`/login?redirect=${targetPath}`);
          }
        } catch {
          throw redirect(`/login?redirect=${targetPath}`);
        } finally {
          release();
        }
      }

      // Перевірка ролей
      if (
        allowedRoles.length > 0 &&
        (!user?.role || !allowedRoles.includes(user.role))
      ) {
        throw redirect("/forbidden");
      }
    }

    return loaderData;
  };
