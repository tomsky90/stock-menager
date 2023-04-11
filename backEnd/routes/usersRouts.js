const express = require('express');
const router = express.Router();

// controller functions
const {loginUser, signupUser } = require('../controllers/userController')

//login route
router.post('https://stock-menager-back-end.onrender.com/login', loginUser);

// sign up route
router.post('/create-user', signupUser);

module.exports = router;
