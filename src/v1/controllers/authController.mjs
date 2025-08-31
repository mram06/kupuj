import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwtHelpers.mjs";
import bcrypt from "bcryptjs";
import AuthDBService from "../models/auth/AuthDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";
import MailSender from "../../../utils/MailSender.mjs";

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

      const existUser = await UsersDBService.getByEmail(req.body.email);
      if (existUser)
        res.status(409).json({ error: "User with this email already exist" });

      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const registeredUser = await AuthDBService.register(user);

      const accessToken = generateAccessToken(registeredUser);
      const refreshToken = generateRefreshToken(registeredUser);

      res
        .setHeader(
          "Set-Cookie",
          `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Max-Age=${
            7 * 24 * 60 * 60
          }; Path=/`
        )
        .json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
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
        .setHeader(
          "Set-Cookie",
          `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Max-Age=${
            7 * 24 * 60 * 60
          }; Path=/`
        )
        .json({
          user: { id: user.id, email: user.email, role: user.role },
          accessToken,
        });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Login error" });
    }
  }

  static async googleAuthCallback(req, res) {
    const user = {
      name: req.user._json.given_name,
      lastname: req.user._json.family_name,
      email: req.user._json.email,
    };
    try {
      const existUser = await UsersDBService.getByEmail(user.email);
      if (existUser) {
        const refreshToken = generateRefreshToken(existUser);

        res.setHeader(
          "Set-Cookie",
          `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Max-Age=${
            7 * 24 * 60 * 60
          }; Path=/`
        );

        return res.redirect("http://localhost:5173/");
      }

      const registeredUser = await AuthDBService.register(user);
      console.log(registeredUser);

      const refreshToken = generateRefreshToken(registeredUser);

      res.setHeader(
        "Set-Cookie",
        `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Max-Age=${
          7 * 24 * 60 * 60
        }; Path=/`
      );

      res.redirect("http://localhost:5173/");
    } catch {
      res.redirect("http://localhost:5173/login?status=500");
    }

    console.log(user);
  }

  static async refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await UsersDBService.getById(payload.id);

      if (!user) return res.sendStatus(401);
      // 5. Генеруємо новий accessToken
      const accessToken = generateAccessToken(user);
      // 6. Відправляємо новий accessToken і дані користувача у відповідь
      res.json({
        user: { id: user.id, email: user.email, role: user.role },
        accessToken,
      });
    } catch {
      // Якщо refreshToken невалідний або прострочений
      return res.sendStatus(403);
    }
  }
  static logout(req, res) {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  }
  static async resetPassword(req, res) {
    if (!req.body.email)
      return res.status(401).json({ error: "Email is required" });

    try {
      const existUser = await UsersDBService.getByEmail(req.body.email);
      if (!existUser)
        return res
          .status(404)
          .json({ error: "User with this email does not exist" });

      const token = Math.floor(100000 + Math.random() * 900000);
      await AuthDBService.generateResetPasswordToken(existUser.id, token);

      await MailSender.sendMail({
        recipientEmail: req.body.email,
        subject: "Reset password",
        text: `Your reset code: ${token}`,
      });
      res.status(200).json({ message: "Reset code sent to email" });
    } catch {
      res.status(500).json({ error: "Reset password error" });
    }
  }
  static async changePassword(req, res) {
    const email = req.body.email;
    const resetCode = req.body.resetCode;
    let password = req.body.password;
    if (!email) return res.status(401).json({ error: "Email is required" });
    if (!resetCode)
      return res.status(401).json({ error: "Reset code is required" });
    if (!password)
      return res.status(401).json({ error: "Password is required" });

    try {
      const existUser = await UsersDBService.getByEmail(req.body.email);
      if (!existUser)
        return res
          .status(404)
          .json({ error: "User with this email does not exist" });

      const tokenValidity = await AuthDBService.checkTokenValidity(
        existUser.id,
        resetCode
      );
      if (!tokenValidity)
        return res.status(401).json({ error: "Invalid or expired reset code" });

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await AuthDBService.changePassword(existUser.id, password, resetCode);

      await MailSender.sendMail({
        recipientEmail: email,
        subject: "Your password has been changed",
        text: `Your password has been changed`,
      });

      res.clearCookie("refreshToken");
      res.status(200).json({ error: "Password changed successfully" });
    } catch {
      res.status(500).json({ error: "Change password error" });
    }
  }
}

export default AuthController;
