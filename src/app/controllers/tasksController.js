const config = require('../../config/config');
const express = require('express');
const router = express.Router();
const taskService = require('../services/tasksService');
const authService = require('../utils/authService');

router.post(`/${config.apiRoute}/tasks/:userId`, authService.validateToken, taskService.getTasks);
router.post(`/${config.apiRoute}/tasks/:userId/:id`, authService.validateToken, taskService.getTask);
router.post(`/${config.apiRoute}/tasks/create/:userId`, authService.validateToken, taskService.createTask);
router.put(`/${config.apiRoute}/tasks/:userId/:id`, authService.validateToken, taskService.updateTask);
router.delete(`/${config.apiRoute}/tasks/:userId/:id`, authService.validateToken, taskService.deleteTask);

module.exports = router;
