import express from "express";
import AdsController from "../controllers/AdsController.mjs";
import upload from "../../../utils/UploadManagerForFile.mjs";
import { checkSchema } from "express-validator";
import AdValidator from "../../../validators/adValidator.mjs";

const router = express.Router();

router.post(
  "/create",
  upload.array("photos"),
  checkSchema(AdValidator.adSchema),
  AdsController.create
);

router.get("/", AdsController.getList);
router.get("/top", AdsController.getTopList);
router.put("/:id", upload.array("photos"), AdsController.update);
router.delete("/:id", AdsController.delete);
router.get("/:id", AdsController.getById);
router.get("/user/:id", AdsController.getByUserId);

export default router;
