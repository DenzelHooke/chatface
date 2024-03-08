const express = require("express");
const { getFriends, addFriend } = require("../controllers/userController");

const router = express.Router();

// Gets all friends
// /api/user/friends/
router.get("/friends", getFriends);

router.post("/addFriend", addFriend);

module.exports = router;

export {};
