import UsersDBService from "../models/user/UsersDBService.mjs";
import { prepareToken } from "../../../utils/jwtHelpers.mjs";
import pool from "../../../db/connectDB.mjs";
import bcrypt from "bcryptjs";

class AuthController {
  static async signup(req, res) {}

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" });
    }

    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const [rows] = await pool.query(sql, [req.body.email]);
      const user = rows[0] || null;

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const result = await bcrypt.compare(req.body.password, user.password);
      console.log(result);

      if (!result) {
        return res.status(401).json({ error: "Login error" });
      }
      const token = prepareToken(
        {
          id: user._id,
          username: user.username,
        },
        req.headers
      );
      res.json({
        result: "Authorized",
        token,
      });
    } catch (err) {
      console.log(err);

      res.status(401).json({ error: "Login error" });
    }
  }
}

export default AuthController;
