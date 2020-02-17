const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('We are on auth');
});

router.post('/signup', (req, res) => {

    try{
        // check if exist in db;


        // create new user in auth
        // create new user in users

        

        res.send('We are on auth signup');
    }
    catch(error) {
        res.status(400).send({message:error});
    }
});

module.exports = router;