const express = require('express');
const router = express.Router();

const requireAdminAuth = require('../middleware/requireAdminAuthorization');

// controller functions
const {loginUser, signupUser } = require('../controllers/userController')


//login route
router.post('/login', loginUser);

// create user
router.post('/create-user', requireAdminAuth, signupUser);

module.exports = router;
