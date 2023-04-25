const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
// const requireAdminAuthorization = require('../middleware/requireAdminAuthorization')

// controller functions
const {loginUser, signupUser } = require('../controllers/userController')


//login route
router.post('/login', loginUser);

// sign up route
router.post('/create-user', requireAuth, signupUser);

module.exports = router;
