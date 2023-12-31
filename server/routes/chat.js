import express from "express";
import * as chatContoller from "../controllers/chat.controller.js";
import * as userMiddleware from "../middleware/user.js";
import * as authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware.isLoggedIn);

router.post(
  "/single",
  userMiddleware.verifyUserExist,
  chatContoller.createSingleRoom
);

router.post(
  "/group",
  userMiddleware.verifyUserExist,
  chatContoller.createGroopRoom
);

router.get("/user/:userId/rooms/recent", chatContoller.getRecentActiveChats);

router.get("/user/:userId/rooms", chatContoller.getAllRoomsByUser);

export default router;
