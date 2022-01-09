const express = require('express')
const router = new express.Router()
const userController = require("../controllers/userController")

// for login and signup
router.post('/login', userController.Login)

module.exports = router;