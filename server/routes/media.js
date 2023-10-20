import express from "express";
import * as mediaController from "../controllers/media.controller.js";
import * as multerMiddleware from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/bots-images",
  multerMiddleware.uploadsMultipleBotsPics,
  mediaController.uploadMultipleFilesToAWS_S3
);

router.post(
  "/profile-pic",
  multerMiddleware.uploadsProfilePic,
  mediaController.uploadProfilePic
);

router.use(multerMiddleware.handleMulterError);
export default router;
