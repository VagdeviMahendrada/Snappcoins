const express = require("express");
const router = express.Router();
const { signup, login ,verifyOtp, sendVerificationEmail,logout, forgotpassword, searchEmail} = require("../controllers/authControllers.js");
const {RegisterValidations,AuthenticateValidations} = require("../utils/validation.js")
const { validationMiddleware } = require("../middleware/validator.js")

router.post("/register",RegisterValidations,validationMiddleware,signup);
router.post("/login",AuthenticateValidations,validationMiddleware,login);
router.post('/forgotpassword',forgotpassword);
router.post("/verifyotp",verifyOtp);
router.post("/getotp",sendVerificationEmail)
router.get("/logout", logout);
router.post('/search-email',searchEmail)

module.exports = router;
