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
    email: {
        desc: "User's email",
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
