import express from "express";
import * as chatContoller from "../controllers/chat.controller.js";
import * as userMiddleware from "../middleware/user.js";

const router = express.Router();

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

export default router;
