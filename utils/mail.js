// mail.js
const nodemailer = require('nodemailer');
const User = require('../models/users');
const Task = require('../models/tasks');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendReminderEmail(task, user) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Reminder: ${task.task}`,
        text: `This is a reminder for your task: ${task.task}\n\nDescription: ${task.description}`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            task.isSent = true;
            try {
                await task.save();
                console.log('Task updated with email sent status');
            } catch (err) {
                console.error('Error updating task:', err);
            }
        }
    });
}

async function checkAndSendEmails() {
    const now = new Date();
    now.setSeconds(0, 0);

    try {
        const tasksDue = await Task.find({
            remainderTime: { $lte: now },
            isSent: false
        });

        for (const task of tasksDue) {
            const user = await User.findById(task.userId);
            if (user) {
                sendReminderEmail(task, user);
            } else {
                console.error('User not found for task:', task._id);
            }
        }
    } catch (error) {
        console.error('Error checking tasks for reminders:', error);
    }
}

setInterval(checkAndSendEmails, 60000);

module.exports = { checkAndSendEmails };
