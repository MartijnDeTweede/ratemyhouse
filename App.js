const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

const app = express();

app.get('/', (req, res) => {
    res.send('We are on home');
});

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true } ,
() =>{
    console.log('connected to DB');
})

app.listen(3000);