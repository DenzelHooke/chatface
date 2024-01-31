const express = require("express");
const {  register } = require('../controllers/authController')

const router = express.Router()
router.route('/register', register).post()

module.exports = router

export {}