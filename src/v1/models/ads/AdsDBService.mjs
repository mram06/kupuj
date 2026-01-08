import pool from "../../../../db/connectDB.mjs";

class AdsDBService {
  static async create(data) {
    const sql = "INSERT INTO adverts SET ?";
    const [result] = await pool.query(sql, data);
    return result;
  }

  static async getList(skip = 0, limit = 10, query) {
    const sql = `SELECT a.id, a.title, a.ad_condition, a.price, a.city, a.photos, a.created_at
                  FROM adverts as a
                  INNER JOIN categories as c ON a.category_id = c.id
                  WHERE COALESCE(?, c.title) = c.title
                  AND COALESCE(?, a.ad_condition) = a.ad_condition
                  AND COALESCE(?, a.city) = a.city
                  AND COALESCE(?, c.title) = c.title
                  AND a.price >= COALESCE(?, 0) AND a.price <= COALESCE(?, 999999999)
                  AND (? IS NULL OR MATCH(a.title, a.description) AGAINST(? IN NATURAL LANGUAGE MODE))
                  ORDER BY 
                    CASE WHEN ? = 'asc' THEN a.price END ASC,
                    CASE WHEN ? = 'desc' THEN a.price END DESC,
                    a.created_at DESC
                  LIMIT ? OFFSET ?`;

    const countSql = `SELECT COUNT(*) as total
                      FROM adverts as a
                      INNER JOIN categories as c ON a.category_id = c.id
                      WHERE COALESCE(?, c.title) = c.title
                      AND COALESCE(?, a.ad_condition) = a.ad_condition
                      AND COALESCE(?, a.city) = a.city
                      AND COALESCE(?, c.title) = c.title
                      AND a.price >= COALESCE(?, 0) AND a.price <= COALESCE(?, 999999999)
                      AND (? IS NULL OR MATCH(a.title, a.description) AGAINST(? IN NATURAL LANGUAGE MODE))`;

    const params = [
      query.title || null,
      query.condition || null,
      query.city || null,
      query.category || null,
      query.priceMin || null,
      query.priceMax || null,
      query.search || null,
      query.search || null,
    ];

    const [result] = await pool.query(sql, [
      ...params,
      query.sort || null,
      query.sort || null,
      limit,
      skip,
    ]);
    const [countResult] = await pool.query(countSql, params);

    return {
      data: result,
      total: countResult[0].total,
    };
  }

  static async getTopList(skip = 0, limit = 5) {
    const sql = `SELECT a.id, a.title, a.ad_condition, a.price, a.city, a.photos, a.created_at
                  FROM adverts as a
                  INNER JOIN top as t
                  WHERE t.advert_id = a.id
                  ORDER BY t.id DESC
                  LIMIT ? OFFSET ?
                 `;

    const [result] = await pool.query(sql, [limit, skip]);

    return result;
  }

  static async getById(id) {
    const sql = `SELECT a.id, a.title, a.description, a.ad_condition, a.category_id, a.price, a.city, a.photos, a.created_at, u.name, u.lastname, u.phone, a.email
                  FROM adverts as a
                  LEFT JOIN users as u ON a.user_id = u.id
                  WHERE a.id = ?`;

    const [result] = await pool.query(sql, [id]);

    return result[0];
  }

  static async getByUserId(id) {
    const sql = `SELECT a.id, a.title, a.ad_condition, a.price, a.city, a.photos, a.created_at
                  FROM adverts as a
                  WHERE user_id = ?`;

    const countSql = `SELECT COUNT(*) as total
                      FROM adverts as a
                      WHERE user_id = ?`;

    const [result] = await pool.query(sql, [id]);
    const [countResult] = await pool.query(countSql, [id]);

    return {
      data: result,
      total: countResult[0].total,
    };
  }

  static async update(adId, data) {
    const sql = `UPDATE adverts SET title = ?, description = ?, ad_condition = ?, 
                 category_id = ?, city = ?, price = ?, photos = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [
      data.title,
      data.description,
      data.ad_condition,
      data.category_id,
      data.city,
      data.price,
      data.photos,
      adId,
    ]);
    return result;
  }

  static async getById(id) {
    const sql = `SELECT a.id, a.title, a.description, a.ad_condition, a.price, 
                 a.city, a.photos, a.category_id, a.created_at, a.user_id,
                 u.name, u.lastname, u.email, u.phone
                 FROM adverts as a
                 INNER JOIN users as u ON a.user_id = u.id
                 WHERE a.id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0] || null;
  }

  static async delete(id) {
    const sql = `DELETE FROM adverts WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  }
}
export default AdsDBService;
