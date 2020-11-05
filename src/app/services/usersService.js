const User = require('../models/user');

exports.getUsers = (req, res) => {
    User.find()
        .sort({name: -1})
        .then((users) => {res.status(200).send(users)})
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an unknown error'
            })
        });
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User with id ${req.params.id} not found`
                });
            }
            res.status(200).send(user);
        });
};

exports.createUser = (req, res) => {
    if (!req.body.name || !req.body.username || !req.body.password) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then((data) => {res.status(200).send(data)})
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an unknown error'
        })});
};

exports.updateUser = (req, res) => {
    if (!req.body.name || !req.body.username || !req.body.password) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }

    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User with id ${req.params.id} not found`
                });
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            return res.status(500).send({
                message: `There was an unknown error`
            });
        });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User with id ${req.params.id} not found`
                });
            }
            res.status(200).send({
                message: `User with id ${req.params.id} deleted successfully`
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: `There was an unknown error`
            });
        });
};
