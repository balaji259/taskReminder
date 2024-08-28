const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../models/users'); // Ensure the correct path to the User model

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variables for sensitive information
        pass: process.env.EMAIL_PASS
    }
});

// Function to send reminder email
function sendReminderEmail(task, user) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,  // Use the user's email
        subject: task.task,
        text: task.description
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);

            // Update the task to indicate the email was sent
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

// Function to schedule email
async function scheduleEmail(task) {
    try {
        const user = await User.findById(task.userId);
        if (!user) {
            console.error('User not found for task:', task._id);
            return;
        }

        const remainderTime = new Date(task.remainderTime);
        const minute = remainderTime.getMinutes();
        const hour = remainderTime.getHours();
        const day = remainderTime.getDate();
        const month = remainderTime.getMonth() + 1;

        // Construct the cron expression
        const cronExpression = `${minute} ${hour} ${day} ${month} *`;

        console.log("Mail scheduled with cron expression:", cronExpression);

        cron.schedule(cronExpression, () => {
            console.log(`Sending email for task: ${task.task}`);
            sendReminderEmail(task, user);
        }, {
            scheduled: true,
            timezone: "Asia/Kolkata"  // Set to the correct timezone
        });

    } catch (error) {
        console.error('Error scheduling email:', error);
    }
}

module.exports = { scheduleEmail };
