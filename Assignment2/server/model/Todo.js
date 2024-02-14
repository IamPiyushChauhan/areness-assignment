const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    }
})



module.exports = mongoose.model('todo',todoSchema);