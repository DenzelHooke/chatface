import { getChatData, initRoom } from "../controllers/roomController";
import { verifyRequest } from "../middleware/tokenMiddleware";

const express = require("express");

const router = express.Router();

// /api/room/user/
router.get("/user", verifyRequest, getChatData);
router.post("/init", verifyRequest, initRoom);

module.exports = router;

export {};
