require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require("./models/tasks");
const users = require("./models/users");
const authRouter = require("./routes/auth");
const taskRouter=require("./routes/tasks.js");
const userRoute=require("./routes/users");
const connectdb = require("./db/connect");
const bodyparser = require('body-parser');
const jwt = require("jsonwebtoken");  // Corrected the typo here
const path = require("path");
const cors = require('cors');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.use("/user", authRouter);
app.use("/tasks",taskRouter);
app.use("/username",userRoute);

connectdb();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(7000, () => {
    console.log("Server listening on port 7000!");
});
