import express from "express";
import CategoriesController from "../controllers/CategoriesController.mjs";

const router = express.Router();

router.get("/", CategoriesController.getList);

export default router;
