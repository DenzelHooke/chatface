import express from "express";
const { addFriend } = require("../controllers/friendController");
import { verifyRequest } from "../middleware/tokenMiddleware";

const router = express.Router();

// /api/friends/
router.post("/add", verifyRequest, addFriend);

// /api/friends/

module.exports = router;
