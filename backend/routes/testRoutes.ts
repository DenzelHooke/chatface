const express = require("express");
const { getTestUsers } = require("../controllers/testController");

const router = express.Router();

router.route("/testUsers").get(getTestUsers);

module.exports = router;
