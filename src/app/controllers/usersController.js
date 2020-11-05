const config = require('../../config/config');
const express = require('express');
const router = express.Router();
const userService = require('../services/usersService');

router.get(`/${config.apiRoute}/users`, userService.getUsers);
router.get(`/${config.apiRoute}/users/:id`, userService.getUser);
router.post(`/${config.apiRoute}/users`, userService.createUser);
router.put(`/${config.apiRoute}/users/:id`, userService.updateUser);
router.delete(`/${config.apiRoute}/users/:id`, userService.deleteUser);

module.exports = router;
