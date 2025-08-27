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
    const sql = `SELECT u.id, u.name, u.lastname, u.email, u.password, t.title AS role  FROM users AS u 
                 INNER JOIN user_types AS t ON u.type_id = t.id
                 WHERE u.email = ?`;

    const [rows] = await pool.query(sql, [email]);
    const user = rows[0] || null;

    return user;
  }
}
export default AuthDBService;
