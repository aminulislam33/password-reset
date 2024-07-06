require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const resetRouter = require('./routes/resetPassword');
const userRouter = require('./routes/user');

mongoose.connect("mongodb://127.0.0.1:27017/password-reset")
.then(()=>{
    console.log("MongoDB Connected")
});

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/user", userRouter);
app.use("/password-reset", resetRouter);

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
});