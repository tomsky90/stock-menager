const express = require('express');
const router = express.Router();

const requireAdminAuth = require('../middleware/requireAdminAuthorization');

// controller functions
const {loginUser, createUser, getUsers, deleteUser } = require('../controllers/userController')


//login route
router.post('/login', loginUser);

// create user
router.post('/create-user', requireAdminAuth, createUser);

// create user
router.get('/get-users', requireAdminAuth, getUsers);

// create user
router.delete('/delete/:id', requireAdminAuth, deleteUser);

module.exports = router;
