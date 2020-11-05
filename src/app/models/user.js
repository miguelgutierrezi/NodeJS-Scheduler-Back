const mongoose = require('../../config/database');

const schema = new mongoose.Schema({
    name: {
        desc: "User's name",
        type: String,
        required: true,
        index: true,
        trim: false,
        unique: false
    },
    username: {
        desc: "User's username",
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: true
    },
    password: {
        desc: "User's password",
        type: String,
        required: true,
        index: false,
        trim: true,
        unique: false
    },
});

module.exports = mongoose.model('users', schema);
