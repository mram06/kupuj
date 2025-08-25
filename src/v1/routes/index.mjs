import { Router } from "express";
const router = Router();

import usersRoutes from "./users.mjs";
import authRoutes from "./authRoutes.mjs";

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export default router;
