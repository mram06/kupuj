import pool from "../../../../db/connectDB.mjs";
import UsersDBService from "../user/UsersDBService.mjs";

class AuthDBService {
  static async register(userData) {
    const sql = "INSERT INTO users SET ?";
    const [result] = await pool.query(sql, userData);

    const user = await UsersDBService.getById(result.insertId);

    return user;
  }

  static async login(email) {
    const sql = `SELECT u.id, u.name, u.email, u.password, u.phone, t.title AS role  FROM users AS u 
                 INNER JOIN user_types AS t ON u.type_id = t.id
                 WHERE u.email = ?`;

    const [rows] = await pool.query(sql, [email]);
    const user = rows[0] || null;

    return user;
  }

  static async generateResetPasswordToken(userId, token) {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const sql = `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
    await pool.query(sql, [userId, token, expiresAt]);

    return true;
  }
  static async checkTokenValidity(userId, token) {
    const sql = `SELECT * FROM password_reset_tokens
                  WHERE user_id = ? AND token = ?`;
    const [result] = await pool.query(sql, [userId, token]);

    const foundToken = result[0];
    if (!foundToken) return false;
    const currentTime = new Date();

    // check is the token expired
    if (currentTime > foundToken.expires_at) return false;

    return true;
  }
  static async changePassword(userId, newPassword, token) {
    // Оновлюємо пароль
    const sql = `UPDATE users SET password = ? WHERE id = ?`;
    await pool.query(sql, [newPassword, userId]);

    // (Опціонально) Видаляємо використаний токен
    const sqlDelete = `DELETE FROM password_reset_tokens WHERE user_id = ? AND token = ?`;
    await pool.query(sqlDelete, [userId, token]);

    return true;
  }
}
export default AuthDBService;
