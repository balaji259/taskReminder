const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    description: { type: String, max: 100 },
    remainderTime: { type: Date, required: true },
    completed: { type: Boolean, default: false }, // Task completion status
    isSent: { type: Boolean, default: false }, // Add this line to track email sent status
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
