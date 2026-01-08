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
    // Let MySQL calculate the expiration time with its configured timezone
    const sql = `INSERT INTO password_reset_tokens (user_id, token, expires_at) 
                 VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))`;
    await pool.query(sql, [userId, token]);

    return true;
  }

  static async checkTokenValidity(userId, token) {
    const sql = `SELECT user_id, token, expires_at FROM password_reset_tokens
                  WHERE user_id = ? AND token = ? AND expires_at > NOW()`;
    const [result] = await pool.query(sql, [userId, token]);

    const foundToken = result[0];

    // If token found and not expired, it's valid
    return !!foundToken;
  }

  static async changePassword(userId, newPassword, token) {
    // Update password
    const sql = `UPDATE users SET password = ? WHERE id = ?`;
    await pool.query(sql, [newPassword, userId]);

    // Delete used token
    const sqlDelete = `DELETE FROM password_reset_tokens WHERE user_id = ? AND token = ?`;
    await pool.query(sqlDelete, [userId, token]);

    return true;
  }
}
export default AuthDBService;
