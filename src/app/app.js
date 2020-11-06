const bodyParser = require('body-parser');
const config = require('../config/config');
const cors = require('cors');
const express = require('express');

const usersController = require('./controllers/usersController');
const tasksController = require('./controllers/tasksController');

const app = express();

const port = process.env.port || config.port

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', usersController);
app.use('api/v1', tasksController);

app.listen(port, () => {
    console.log(`Listening on ${config.port}`);
});

module.exports = app;
