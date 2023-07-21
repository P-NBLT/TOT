import express from "express";
import * as messageController from "../controllers/message.controller.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.use(isLoggedIn);

router.post("/bot", messageController.sendMessageToBot);
router.post("/user", messageController.sendMessageToUser);

export default router;
