// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require("./models/tasks");
const users = require("./models/users");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks.js");
const userRoute = require("./routes/users");
const connectdb = require("./db/connect");
const bodyparser = require('body-parser');
const jwt = require("jsonwebtoken");
const path = require("path");
require('./utils/mail'); // Import mail.js to start email interval checks

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use("/user", authRouter);
app.use("/tasks", taskRouter);
app.use("/username", userRoute);

connectdb();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(7000, () => {
    console.log("Server listening on port 7000!");
});
