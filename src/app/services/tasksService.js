const Task = require('../models/task');

exports.getTasks = (req, res) => {
    Task.find({userId: req.params.userId})
        .then((tasks) => {
            res.status(200).send(tasks);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};

exports.getTask = (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                });
            }
            res.status(200).send(task);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};

exports.createTask = (req, res) => {
    if (!req.body.name || !req.body.priority || !req.body.dateTask) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }

    const task = new Task({
        name: req.body.name,
        priority: req.body.priority,
        date: req.body.dateTask,
        userId: req.params.userId
    });

    task.save()
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an unknown error'
            })
        });
};

exports.updateTask = (req, res) => {
    if (!req.body.name || !req.body.priority || !req.body.dateTask) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }

    const newTask = {
        name: req.body.name,
        priority: req.body.priority,
        date: req.body.dateTask,
        userId: req.params.userId
    };

    Task.findByIdAndUpdate(req.params.id, newTask, {new: true})
        .then((task) => {
            if (!task) {
                return res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                });
            }
            res.status(202).send(task);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};

exports.deleteTask = (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                });
            }
            res.status(202).send({
                message: `Task with id ${req.params.id} deleted successfully`
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};

exports.deleteAllTasksFromUser = (req, res) => {
    Task.deleteMany({userId: req.params.userId})
        .then((tasks) => {
            return res.status(202).send({
                message: `The tasks of the user with id ${req.params.id} has been removed successfully`
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
}
