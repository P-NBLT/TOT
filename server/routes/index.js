import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import messageRouter from "./message.js";
import chatRouter from "./chat.js";
import searchRouter from "./search.js";
import mediaRouter from "./media.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/message", messageRouter);
router.use("/chat", chatRouter);
router.use("/search", searchRouter);
router.use("/media", mediaRouter);

export default router;
