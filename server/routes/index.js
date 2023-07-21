import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import chatRouter from "./chat.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/chat", chatRouter);

export default router;
