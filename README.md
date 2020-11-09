# NodeJS-Scheduler-Back

This api has been deployed using heroku, if you want to try it, it is located on the following [url](https://nodejs-scheduler-back.herokuapp.com/).

This api was developed using NodeJS Framework, and using mongodb for persistence.

## Cloning the repo

For cloning the repo run the following command: `git clone https://github.com/miguelgutierrezi/NodeJS-Scheduler-Back.git`

## Running unit tests

There are two ways for running unit tests in this project. The first one is to run the tests without coverage using the following command `npm run test`.
Also, if you want to run the unit tests viewing code coverage, you could run `npm run coverage`.

## Continuous Integration

This project are using continuous integration for the firebase deployment o the app. The **config.yaml** could be find under the following route: **.circleci/config.yaml**
This continuous integration was made with circleCI.

## Server

Run `npm start` for a server. Navigate to `http://localhost:3000/`.

## Development server

Run `npm run dev` for a dev server. It will run using nodemon, so every change you made will be refresh automatically. Navigate to `http://localhost:3000/`.

## Routes

### User service

If you want to try the user service the routes are the following

#### Login

`/api/v1/login/`

For this route you should make a post request with the following body:

```
{
    email,
    password
}
```

The password should be encrypted with CryptoJS AES method.

#### Register

`/api/v1/users/`

For this route you should make a post request with the following body:

```
{
    name,
    email,
    password
}
```

The password should be encrypted with CryptoJS AES method.

#### Get all users

`/api/v1/users/`

For this route you should make a get request.

#### Get a specific user

`/api/v1/users/:userId`

For this route you should make a get request with the userId you want to get as param.

#### Update user

`/api/v1/users/:userId`

For this route you should make a put request with the userId you want to get as param, also with the following body:

```
{
    name,
    email,
    password
}
```

The password should be encrypted with CryptoJS AES method.

#### Delete a specific user

`/api/v1/users/:userId`

For this route you should make a delete request with the userId you want to get as param.

### Tasks service

In the tasks service, is mandatory to always send an authorization header with a Bearer token. And the date to validate the token in the body.

#### Get all tasks from a specific user

`/api/v1/tasks/:userId`

For this route you should make a post request with the userId you want to get as param, also with the following body:

```
{
    date
}
```

#### Get a specific task

`/api/v1/tasks/get/:userId/:taskId`

For this route you should make a post request with the userId and taskId you want to get as params, also with the following body:

```
{
    date
}
```

#### Create a new task

`/api/v1/tasks/create/:userId`

For this route you should make a post request with the userId you want to create the task as param, also with the following body:

```
{
    name,
    priority,
    dateTask,
    date
}
```

#### Update a task

`/api/v1/tasks/create/:userId/:taskId`

For this route you should make a put request with the userId, and the taskId you want to update as param, also with the following body:

```
{
    name,
    priority,
    dateTask,
    date
}
```

#### Delete a task

`/api/v1/tasks/delete/:userId/:taskId`

For this route you should make a put request with the userId, and the taskId you want to delete as params, also with the following body:

```
{
    date
}
```

#### Delete all tasks from a user

`/api/v1/tasks/:userId`

For this route you should make a put request with the userId you want to delete the tasks as param, also with the following body:

```
{
    date
}
```
