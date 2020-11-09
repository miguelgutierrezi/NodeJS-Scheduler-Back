const express = require('express');
const router = express.Router();
const userService = require('../services/usersService');

router.get('/users', userService.getUsers);
router.get('/users/:id', userService.getUser);
router.post('/users', userService.createUser);
router.post('/login', userService.login);
router.put('/users/:id', userService.updateUser);
router.delete('/users/:id', userService.deleteUser);

module.exports = router;
