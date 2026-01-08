import { parseBearer } from "../utils/jwtHelpers.mjs";

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
  // Middleware для перевірки аутентифікації та авторизації
  app.use((req, res, next) => {
    // Відкриті шляхи, які не потребують авторизації
    const openPathes = [
      "/api/v1/auth/login",
      "/api/v1/auth/signup",
      "/api/v1/auth/refresh",
      "/api/v1/auth/reset-password",
      "/api/v1/auth/change-password",
      "/api/v1/auth/google",
      "/api/v1/auth/google/callback",
      "/api/v1/ads",
      "/api/v1/ads/top",
      "/api/v1/ads/:id",
      "/api/v1/categories",
      "/api/v1/uploads",
    ];

    // Перевіряємо чи шлях потребує авторизації
    const needsAuth =
      !openPathes.includes(req.path) &&
      !req.path.startsWith("/api/v1/uploads") &&
      !(req.path.startsWith("/api/v1/ads") && req.method === "GET");

    if (needsAuth) {
      try {
        // Парсинг токена та додавання користувача до запиту
        req.user = parseBearer(req.headers.authorization, req.headers);
      } catch (err) {
        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ result: "Access Denied" });
      }
    }
    next(); // Передача обробки наступному middleware
  });
};

// Експорт функції auth як модуля за замовчуванням
export default auth;
