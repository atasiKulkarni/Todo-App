const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
  
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todoappRouter = require('./routes/todoapp');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SERVEL_URL, 
{
         useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
       useCreateIndex: true
}, 
function(err,res)    //this is called callback function
{
    if(err)
   {
       console.log("Error Occurred", err);
   }
 else
 {
     console.log("Connection to databse is successful");
 }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todoapp', todoappRouter);

module.exports = app;
