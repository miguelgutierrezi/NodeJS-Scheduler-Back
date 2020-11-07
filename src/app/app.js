const bodyParser = require('body-parser');
const config = require('../config/config');
const cors = require('cors');
const express = require('express');

const usersController = require('./controllers/usersController');
const tasksController = require('./controllers/tasksController');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/${config.apiRoute}`, usersController);
app.use(`/${config.apiRoute}`, tasksController);

app.listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
});

module.exports = app;
