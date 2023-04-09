const express = require('express');
const router = express.Router();

// controller functions
const {loginUser, signupUser } = require('../controllers/userController')

//login route
router.post('/login', loginUser);

// sign up route
router.post('/create-user', signupUser);

module.exports = router;