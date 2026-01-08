import express from "express";
import FavoritesController from "../controllers/FavoritesController.mjs";

const router = express.Router();

router.get("/", FavoritesController.getList);
router.get("/ids", FavoritesController.getIdsList);
router.post("/add/:id", FavoritesController.add);

export default router;
