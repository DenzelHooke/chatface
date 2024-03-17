const express = require("express");
const { getFriends, findUsers } = require("../controllers/userController");

const router = express.Router();

// Gets all friends
// /api/user/friends/
router.get("/friends", getFriends);

router.post("/findFriends", findUsers);

module.exports = router;

export {};
