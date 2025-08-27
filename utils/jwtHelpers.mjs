import jwt from "jsonwebtoken";

// Час дії токена
const expiresIn = "60m";

// Секретний ключ для токена (повинен бути збережений у .env файлі)
const tokenKey = "Our Token Key"; // Save in .env !!!

// Функція для парсингу Bearer токена та декодування користувача
export function parseBearer(bearer, headers) {
  let token;
  // Перевіряємо, чи токен починається з 'Bearer '
  if (bearer.startsWith("Bearer ")) {
    token = bearer.slice(7); // Видаляємо 'Bearer ' з початку токена
  }
  try {
    // Декодуємо токен з використанням підготовленого секрету
    const decoded = jwt.verify(token, prepareSecret(headers));
    return decoded; // Повертаємо декодовані дані
  } catch (err) {
    // Якщо токен невірний або закінчився його термін дії, буде згенеровано помилку
    throw new Error("Invalid token");
  }
}

// Функція для створення JWT токена
export function prepareToken(data, headers) {
  // Підписуємо дані токена з використанням підготовленого секрету
  return jwt.sign(data, prepareSecret(headers), {
    expiresIn, // Вказуємо час дії токена
  });
}

// Функція для підготовки секретного ключа з додаванням заголовків
function prepareSecret(headers) {
  // Секретний ключ токена об'єднується з user-agent та accept-language заголовками
  return tokenKey + headers["user-agent"] + headers["accept-language"];
}

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES,
  });
}
