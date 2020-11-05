const config = require('../../config/config');
const express = require('express');
const router = express.Router();
const taskService = require('../services/tasksService');

router.get(`/${config.apiRoute}/tasks`, taskService.getTasks);
router.get(`/${config.apiRoute}/tasks/:id`, taskService.getTask);
router.post(`/${config.apiRoute}/tasks`, taskService.createTask);
router.put(`/${config.apiRoute}/tasks/:id`, taskService.updateTask);
router.delete(`/${config.apiRoute}/tasks/:id`, taskService.deleteTask);

module.exports = router;
