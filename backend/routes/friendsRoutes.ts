import express from "express";
const { addFriend } = require("../controllers/friendController");

const router = express.Router();

// /api/friends/
router.post("/add", addFriend);

// /api/friends/

module.exports = router;
