const express = require('express');
const router = express.Router();
const taskService = require('../services/tasksService');
const authService = require('../utils/authService');

router.post('/tasks/:userId', authService.validateToken, taskService.getTasks);
router.post('/tasks/get/:userId/:id', authService.validateToken, taskService.getTask);
router.post('/tasks/create/:userId', authService.validateToken, taskService.createTask);
router.put('/tasks/:userId/:id', authService.validateToken, taskService.updateTask);
router.put('/tasks/delete/:userId/:id', authService.validateToken, taskService.deleteTask);
router.put('/tasks/:userId', authService.validateToken, taskService.deleteAllTasksFromUser);

module.exports = router;
