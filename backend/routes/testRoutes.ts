const express = require("express");
const { getTestUsers, getTest } = require("../controllers/testController");

const router = express.Router();

router.route("/testUsers").get(getTestUsers);
router.route("/testGet").get(getTest)

module.exports = router;

export {}
