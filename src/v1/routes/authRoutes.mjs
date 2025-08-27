import express from "express";

import AuthController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/refresh", AuthController.refresh);

export default router;
