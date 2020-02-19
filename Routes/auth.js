const express = require('express');
const router = express.Router();

const { addAuth, emailExists, generateHashedPassword } = require('../Helpers/authHelper');
const {validateSignUp } = require('../Validators/authValidators');
const { createInitialUser } = require('../Helpers/userHelper');

router.post('/signup', async (req, res) => {
    const {
      email,
      userName,
      password,
    } = req.body;
    try{
      const error = await validateSignUp(req.body);
      if(error) return res.status(400).send(error);

      const emailAlreadyExists = await emailExists(email);
      if(emailAlreadyExists) return res.status(400).send({message: "Email already exists"});
        
      const hashedPassword = await generateHashedPassword(password);
        await addAuth(email, hashedPassword)
        const newUser = await createInitialUser(email, userName);
        res.json(newUser);
    }
    catch(error) {
        res.status(400).send({message:error});
    }
});

module.exports = router;