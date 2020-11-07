const config = require('../../config/config');
const express = require('express');
const router = express.Router();
const taskService = require('../services/tasksService');
const authService = require('../utils/authService');

router.post('/tasks/:userId', authService.validateToken, taskService.getTasks);
router.post('/tasks/get/:userId/:id', authService.validateToken, taskService.getTask);
router.post('/tasks/create/:userId', authService.validateToken, taskService.createTask);
router.put('/tasks/:userId/:id', authService.validateToken, taskService.updateTask);
router.delete('/tasks/:userId/:id', authService.validateToken, taskService.deleteTask);
router.delete('/tasks/:userId', authService.validateToken, taskService.deleteAllTasksFromUser);

module.exports = router;
