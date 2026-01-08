import { Router } from "express";
const router = Router();

import usersRoutes from "./users.mjs";
import authRoutes from "./authRoutes.mjs";
import adsRoutes from "./adsRoutes.mjs";
import categoriesRoutes from "./categoriesRoutes.mjs";
import favoritesRoutes from "./favoritesRoutes.mjs";

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/ads", adsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/favorites", favoritesRoutes);

export default router;
