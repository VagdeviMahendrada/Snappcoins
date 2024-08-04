const User = require("../models/gamerModel");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../services/token");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
  }
});

exports.sendVerificationEmail= async(req,res)=>{
  try{
    const otp = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    // Testing to check otp functionality
    console.log("Gamer OTP: " + otp);
    console.log(req.query.uid)
    const {email} = await User.findById(req.query.uid)
    const mailOptions={
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html:`<p>Enter <b>${otp}</b> to verify your email ...</p>`
    }

    const hashedotp = await bcrypt.hash(otp, 10);
    req.app.locals.OTP = hashedotp

    //testing
    //  transporter.sendMail(mailOptions,(err, info) => {
    //    if(err){
    //     console.log('err',err);
    //    }  
    // });
    

    res.status(201).send({ msg: "Otp Sent"});
    
  }catch(err){
    console.log("signup error is:  ",err);
    res.status(500).json({msg:err});
  }

}

exports.signup = async (req, res) => {
  try {
    const { userName, password, email, confirmpassword,country } = req.body;
    
    //console.log(req.body);
    
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, msg: "This email is already registered",user });
    }
    
    else if (password !== confirmpassword) {
      return res.status(400).json({ success: false, msg: "Password and confirm password must be the same" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const createuser = await User.create({ userName, email, password: hashedPassword ,country});

    console.log("Gamer ID is: ", createuser._id);

    res.status(200).send({ userId: createuser._id, email, msg: "Registration Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error ${error.message}` });
  }
};


exports.login = async (req, res) => {
    try {
        const { password ,email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });
        const token = createAccessToken({ id: user._id });
        res.status(200).json({token, id: user._id, email , status: true, msg: "Verify Your Email ..." });
    }
    catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.verifyOtp = async(req,res) =>{
  try{
    const {otp,uid} = req.query;
    const {verified} = await User.findById({_id:uid})
    const result  = await bcrypt.compare(otp,req.app.locals.OTP);
    if (result){
      res.status(201).json({ status: true, msg: "Email Verified" });
      if(!verified) await User.findByIdAndUpdate(uid,{verified : true})
      req.app.locals.OTP=null
    }
    else{
      res.status(400).json({ status: false, msg: "otp mismatched" });
    }
  }

   catch (err) {
     console.error(err);
     return res.status(500).json({ status: false, msg: "Something went wrong !!!" }); }
}


exports.forgotpassword = async(req,res) =>{
  const {password,id}=req.body
  console.log(password,id)
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({_id:id},{password:hashedPassword},{new:true});
    res
      .status(200)
      .send({msg: "Password Changed Successfully" });
  }catch(error){
    console.log(error)
    return res.status(500).json({status:false,msg:error})
  }
}

exports.searchEmail = async(req,res) =>{
  const {email} = req.body;
  try{
    const user = await User.findOne({email});
    return res.status(200).json({status:true,msg:"User with email found",user})
  }
  catch(error){
    return res.status(500).json({status:false,msg:error})
  }
}