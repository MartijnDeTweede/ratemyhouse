const express = require('express');
const router = express.Router();

const { addAuth, emailExists, generateHashedPassword, getAuthByEmail, credentialsAreValid } = require('../Helpers/authHelper');
const {validateSignUp, loginValidation } = require('../Validators/authValidators');
const { createInitialUser, getUserByEmail } = require('../Helpers/userHelper');

router.post('/signup', async (req, res) => {
    try{
      const error = await validateSignUp(req.body);
      if(error) return res.status(400).send(error);

      const { email, userName, password } = req.body;

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

router.post('/login', async (req, res) => {
  try{
    const error = await loginValidation(req.body);
    if(error) return res.status(400).send(error);
  
    const { email, password } = req.body;
  
    const emailAlreadyExists = await emailExists(email);
    if(!emailAlreadyExists) return res.status(400).send({message: "Incorrect e-mail or password."});
    
    const auth = await getAuthByEmail(email);
    const validpass = await credentialsAreValid(password, auth.password);
    if(!validpass) return res.status(400).send({message: "Incorrect e-mail or password."});

    const user = await getUserByEmail(email);
    res.json(user);
  } catch(error) {
    res.status(400).send({message:error});
  };
});


module.exports = router;