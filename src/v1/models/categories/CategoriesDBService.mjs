import pool from "../../../../db/connectDB.mjs";

class CategoriesDBService {
  static async create(data) {
    const sql = "INSERT INTO adverts SET ?";
    const [result] = await pool.query(sql, data);
    return result;
  }

  static async getList() {
    const sql = `SELECT * FROM categories`;
    const [result] = await pool.query(sql);
    return result;
  }
}
export default CategoriesDBService;
