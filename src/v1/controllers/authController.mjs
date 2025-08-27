import UsersDBService from "../models/user/UsersDBService.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
  prepareToken,
} from "../../../utils/jwtHelpers.mjs";
import pool from "../../../db/connectDB.mjs";
import bcrypt from "bcryptjs";
import AuthDBService from "../models/auth/AuthDBService.mjs";

class AuthController {
  static async signup(req, res) {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   const data = req.body;
      //   return res
      //     .status(400)
      //     .json({ errors: errors.array(), error: "Signup error", data: data });
      // }

      const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const registeredUser = await AuthDBService.register(user);

      const accessToken = generateAccessToken(registeredUser);
      const refreshToken = generateRefreshToken(registeredUser);

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // true - in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
          },
          accessToken,
        });
    } catch (err) {
      res.status(500).json({ error: "Signup error" });
    }
  }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" });
    }
    try {
      const user = (await AuthDBService.login(req.body.email)) || null;

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // true - in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          user: { id: user.id, email: user.email, role: user.role },
          accessToken,
        });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Login error" });
    }
  }
}

export default AuthController;
