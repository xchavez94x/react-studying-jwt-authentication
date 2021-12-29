const express = require('express');
const router = express.Router();

const usersController = require('../Controllers/UsersController');

router.post("/register", usersController.saveUser);

router.post('/login', usersController.usersLogin)

router.post('/logout', )

module.exports = router