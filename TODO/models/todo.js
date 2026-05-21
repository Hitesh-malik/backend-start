const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'In Progress'],
            required: true,
        },

        task: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', todoSchema);