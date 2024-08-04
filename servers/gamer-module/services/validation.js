const { check } =  require('express-validator');

const userName = check("userName","User Name is required").not().isEmpty();
const password = check("password","Password minimum len 4 and max 15 is required").isLength({
  min:4,
  max:15
})
const email = check("email","Enter a valid email..").isEmail()



const RegisterValidations = [userName,password,email]
const AuthenticateValidations =[email,password]

module.exports = {
  RegisterValidations,
  AuthenticateValidations
}