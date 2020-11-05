const bodyParser = require('body-parser');
const config = require('../config/config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const usersController = require('./controllers/usersController');
const tasksController = require('./controllers/tasksController');

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@cluster0.pwyq5.mongodb.net/${config.database}?retryWrites=true&w=majority`);

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('api/v1/', usersController);
app.use('api/v1/', tasksController);

app.listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
});

module.exports = app;
