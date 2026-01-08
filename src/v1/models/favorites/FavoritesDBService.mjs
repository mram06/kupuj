import pool from "../../../../db/connectDB.mjs";

class FavoritesDBService {
  static async add(advert_id, user_id) {
    const checkSql =
      "SELECT * FROM favorites WHERE advert_id = ? AND user_id = ?";
    const [existing] = await pool.query(checkSql, [advert_id, user_id]);

    if (existing.length > 0) {
      // Delete if exists
      const deleteSql =
        "DELETE FROM favorites WHERE advert_id = ? AND user_id = ?";
      const [result] = await pool.query(deleteSql, [advert_id, user_id]);
      return { action: "removed", result };
    } else {
      // Add to favorites
      const insertSql = "INSERT INTO favorites SET ?";
      const [result] = await pool.query(insertSql, { advert_id, user_id });
      return { action: "added", result };
    }
  }

  static async getList(userId) {
    const sql = `SELECT a.id, a.title, a.ad_condition, a.price, a.city, a.photos, a.created_at
                  FROM adverts as a
                  INNER JOIN favorites as f
                  WHERE f.user_id = ? AND f.advert_id = a.id`;
    const [result] = await pool.query(sql, [userId]);
    return result;
  }

  static async getIdsList(userId) {
    const sql = `SELECT * FROM favorites WHERE user_id = ?`;
    const [result] = await pool.query(sql, [userId]);
    return result;
  }
}
export default FavoritesDBService;
