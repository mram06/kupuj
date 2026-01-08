import pool from "../../../../db/connectDB.mjs";
import CRUDManager from "../CRUDManager.mjs";

class UsersDBService extends CRUDManager {
  async getList() {}

  async getById(id) {
    const sql = `SELECT u.id, u.name, u.lastname, u.email, u.phone, t.title AS role  FROM users AS u 
                 INNER JOIN user_types AS t ON u.type_id = t.id
                 WHERE u.id = ?`;
    const [rows] = await pool.query(sql, id);

    return rows[0] || null;
  }

  async getByEmail(email) {
    const sql = `SELECT u.id, u.name, u.email, u.phone, t.title AS role  FROM users AS u 
                 INNER JOIN user_types AS t ON u.type_id = t.id
                 WHERE u.email = ?`;
    const [rows] = await pool.query(sql, email);

    return rows[0] || null;
  }

  async updateProfile(userId, userData) {
    const { name, lastname, email, phone } = userData;
    const sql = `UPDATE users SET name = ?, lastname = ?, email = ?, phone = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [name, lastname, email, phone, userId]);

    // Return updated user
    return await this.getById(userId);
  }
}

export default new UsersDBService("users");
