import express from "express";
import * as authMiddleware from "../middleware/auth.js";
import * as profileController from "../controllers/profile.controller.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware.isLoggedIn,
  profileController.getUsersProfile
);

router.get(
  "/preview",
  authMiddleware.isLoggedIn,
  profileController.getPreviewProfileData
);

router.get(
  "/:userId",
  authMiddleware.isLoggedIn,
  profileController.getUserProfile
);
router.post(
  "/create-profile",
  authMiddleware.isLoggedIn,
  profileController.createUserProfile
);

export default router;
