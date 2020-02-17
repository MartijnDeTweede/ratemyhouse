const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

// Import routs
const authRoutes = require('./Routes/auth');

const app = express();

app.use('/auth', authRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true } ,
() =>{
    console.log('connected to DB');
})

app.listen(3000);