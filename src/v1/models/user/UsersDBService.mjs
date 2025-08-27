import pool from "../../../../db/connectDB.mjs";
import CRUDManager from "../CRUDManager.mjs";

class UsersDBService extends CRUDManager {
  async getList() {}
  async getById(id) {
    const sql = `SELECT u.id, u.name, u.lastname, u.email, t.title AS role  FROM users AS u 
                 INNER JOIN user_types AS t ON u.type_id = t.id
                 WHERE u.id = ?`;
    const [rows] = await pool.query(sql, id);

    return rows[0] || null;
  }
}

export default new UsersDBService("users");
