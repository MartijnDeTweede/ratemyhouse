
const router = require('express').Router();
require('dotenv/config');

const { addAuth, emailExists, generateHashedPassword, getAuthByEmail, credentialsAreValid } = require('../Helpers/authHelper');
const {validateSignUp, loginValidation } = require('../Validators/authValidators');
const { createInitialUser, getUserByEmail } = require('../Helpers/userHelper');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { sendValidRequestWithUser } = require('../Helpers/succesResponseHelper');

router.post('/signup', async (req, res) => {
    try{
      const error = await validateSignUp(req.body);
      if(error) return res.status(400).send(error);

      const { email, userName, password } = req.body;

      const emailAlreadyExists = await emailExists(email);
      if(emailAlreadyExists) handleBadRequest(res, "Email already exists.");
        
      const hashedPassword = await generateHashedPassword(password);
        await addAuth(email, hashedPassword)
        const user = await createInitialUser(email, userName);
        sendValidRequestWithUser(res, user);

    }
    catch(error) {
      handleBadRequest(res, error);
    }
});

router.post('/login', async (req, res) => {
  try{
    const error = await loginValidation(req.body);
    if(error) return res.status(400).send(error);
  
    const { email, password } = req.body;
  
    const emailAlreadyExists = await emailExists(email);
    if(!emailAlreadyExists) return handleBadRequest(res, "Incorrect e-mail or password.");
    
    const auth = await getAuthByEmail(email);
    const validpass = await credentialsAreValid(password, auth.password);
    if(!validpass) return handleBadRequest(res, "Incorrect e-mail or password.");

    const user = await getUserByEmail(email);
    sendValidRequestWithUser(res, user);
  } catch(error) {
    handleBadRequest(res, error);
  };
});


module.exports = router;