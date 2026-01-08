import express from "express";

import AuthController from "../controllers/authController.mjs";
import passport from "passport";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  AuthController.googleAuthCallback
);

router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.post("/reset-password", AuthController.resetPassword);
router.post("/change-password", AuthController.changePassword);
router.put("/update-profile", AuthController.updateProfile);

export default router;
