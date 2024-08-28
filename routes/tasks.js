const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');  // Ensure this path is correct
const { scheduleEmail } = require('../utils/mail'); 

// Fetch individual task
router.get("/task/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Fetch tasks for a specific user
router.get('/get/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.json(tasks); // Return tasks array, even if empty
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/add/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { task, description, remainderTime } = req.body;

        const newTask = new Task({ userId, task, description, remainderTime });
        const savedTask = await newTask.save();

        scheduleEmail(savedTask);
        
        res.status(201).json({ message: 'Task added!', task: savedTask });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Update a task
router.put('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { task, description, remainderTime, completed } = req.body; // Include completed field

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { task, description, remainderTime, completed, updatedAt: Date.now() }, // Update completed field
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        scheduleEmail(updatedTask);
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
    const { taskId } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
