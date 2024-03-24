const express = require("express");
const {
  getFriends,
  findUsers,
  getPendingFriendRequests,
} = require("../controllers/userController");
import { verifyRequest } from "../middleware/tokenMiddleware";
const router = express.Router();

// Gets all friends
// /api/user/friends/
router.get("/friends", verifyRequest, getFriends);

router.post("/findFriends", verifyRequest, findUsers);

router.get("/getFriendRequests", verifyRequest, getPendingFriendRequests);

module.exports = router;

export {};
