const cypherService = require('../utils/cypherService');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }

    User.find({email: req.body.email})
        .then((users) => {
            const user = users[0];
            if (!user) {
                return res.status(404).send({
                    message: `User with email ${req.body.email} not found`
                });
            }

            const decryptedBodyPassword = cypherService.decrypt(req.body.password);
            const decryptedPassword = cypherService.decrypt(user.password);

            if (decryptedBodyPassword !== decryptedPassword) {
                return res.status(401).send({
                    message: `Invalid password`
                });
            }
            const dataToToken = {
                name: user.name,
                email: user.email
            }
            const date = new Date().toISOString();
            const token = jwt.sign(dataToToken, date);
            res.status(200).send({
                token: token,
                date: date
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
}

exports.getUsers = (req, res) => {
    User.find()
        .sort({name: -1})
        .then((users) => {
            res.status(200).send(users)
        })
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
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};

exports.createUser = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Missing arguments'
        });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an unknown error'
            })
        });
};

exports.updateUser = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
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
            res.status(202).send(user);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
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
            res.status(202).send({
                message: `User with id ${req.params.id} deleted successfully`
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || `There was an unknown error`
            });
        });
};
