const express = require("express");
const {
  getFriends,
  addFriend,
  findFriends,
} = require("../controllers/userController");

const router = express.Router();

// Gets all friends
// /api/user/friends/
router.get("/friends", getFriends);

router.post("/addFriend", addFriend);

router.post("/findFriends", findFriends);

module.exports = router;

export {};
