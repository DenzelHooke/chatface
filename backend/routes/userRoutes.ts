const express = require("express");
const {
  getFriends,
  findUsers,
  getPendingFriendRequests,
} = require("../controllers/userController");

const router = express.Router();

// Gets all friends
// /api/user/friends/
router.get("/friends", getFriends);

router.post("/findFriends", findUsers);

router.get("/getFriendRequests", getPendingFriendRequests);

module.exports = router;

export {};
