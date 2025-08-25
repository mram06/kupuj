import config from "../config/default.mjs";
import mysql from "mysql2/promise";

async function connectToMySQL() {
  try {
    const pool = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    console.log("Connected to MySQL");
    return pool;
  } catch (err) {
    console.error("Error, not connected MySQL:", err);
  }
}
const pool = await connectToMySQL();

export default pool;
