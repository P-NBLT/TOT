import express from "express";
import { searchFriendAndChatByQuery } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", searchFriendAndChatByQuery);

export default router;
