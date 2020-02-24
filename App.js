const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Import routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const videoRoutes = require('./Routes/video');


const app = express();
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/video', videoRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true } ,
() =>{
    console.log('connected to DB');
})

app.listen(4000);