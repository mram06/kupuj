import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwtHelpers.mjs";
import bcrypt from "bcryptjs";
import AuthDBService from "../models/auth/AuthDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";
import MailSender from "../../../utils/MailSender.mjs";
import config from "../../../config/default.mjs";

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
      if (existUser) {
        return res
          .status(409)
          .json({ error: "User with this email already exist" });
      }

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

        return res.redirect(config.redirectURL);
      }

      const registeredUser = await AuthDBService.register(user);
      const refreshToken = generateRefreshToken(registeredUser);

      res.setHeader(
        "Set-Cookie",
        `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Max-Age=${
          7 * 24 * 60 * 60
        }; Path=/`
      );

      res.redirect(config.redirectURL);
    } catch {
      res.redirect(`${config.redirectURL}login?status=500`);
    }
  }

  static async refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await UsersDBService.getById(payload.id);

      if (!user) return res.sendStatus(401);
      const accessToken = generateAccessToken(user);
      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          lastName: user.lastname,
          phone: user.phone,
        },
        accessToken,
      });
    } catch {
      return res.sendStatus(403);
    }
  }

  static logout(req, res) {
    res.setHeader(
      "Set-Cookie",
      "refreshToken=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 UTC"
    );
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
    } catch (err) {
      console.error("Reset password error:", err);
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
      res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      console.error("Change password error:", err);
      res.status(500).json({ error: "Change password error" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { name, lastname, email, phone } = req.body;

      // Validate required fields
      if (!name || !lastname || !email || !phone) {
        return res.status(400).json({
          error: "Name, lastname, email, and phone are required",
        });
      }

      // Check if email already exists for another user
      const existingUser = await UsersDBService.getByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({
          error: "Email already in use by another user",
        });
      }

      const updatedUser = await UsersDBService.updateProfile(userId, {
        name,
        lastname,
        email,
        phone,
      });

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ error: "Update profile error" });
    }
  }
}

export default AuthController;
