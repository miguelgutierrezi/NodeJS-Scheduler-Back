const mongoose = require('../../config/database');

const schema = new mongoose.Schema({
    name: {
        desc: "Task's name",
        type: String,
        required: true,
        index: false,
        trim: false,
        unique: false
    },
    priority: {
        desc: "Task's priority",
        type: Number,
        required: true,
        index: false,
        trim: true,
        unique: false
    },
    date: {
        desc: "Task's due date",
        type: Date,
        required: true,
        index: true,
        trim: true,
        unique: false
    },
    userId: {
        desc: "Task's owner",
        type: String,
        required: true,
        index: true,
        trim: false,
        unique: false
    }
});

module.exports = mongoose.model('tasks', schema);
