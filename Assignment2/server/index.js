const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/TodoRoutes');
const app = express();


require("dotenv").config()

mongoose.connect("mongodb://localhost:27017/todolist", 
{ useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))


app.use("/todo", todoRoutes)

app.listen(8080,()=>{
    console.log("Surver is running on 8080");
})