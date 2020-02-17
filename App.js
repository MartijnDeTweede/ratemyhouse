const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


// Import routs
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true } ,
() =>{
    console.log('connected to DB');
})

app.listen(3000);