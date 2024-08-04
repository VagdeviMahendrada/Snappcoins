const {validationResult}  = require("express-validator");
const  bcrypt = require("bcrypt");
const User = require('../models/gamingMerchantModel')
const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');


const deleteImage = async(id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  try{
      const gfs = await gfsPromise;
      // console.log("merchant0",gfs)
      gfs.delete(_id, (err) => {
        if (err) return res.status(500).send('image deletion error');
      });
  }
  catch(error){
      console.log("trying err",err)
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updateProfile = async(req,res) =>{
  try{
    const {id , prevImgId} = req.query
    console.log(prevImgId)
    const file = req.file 
    let fid;
    if(file) fid = file.id;
    console.log(fid)
    await User.findByIdAndUpdate({_id:id},{...req.body,image:fid?fid:prevImgId},{ new: true }).then((user)=>{
      if(fid && prevImgId) deleteImage(prevImgId)
      res.status(200).json({user,status:true,msg:"Profile Updated successfully"})
    })
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updateProfileNew = async (req, res) => {
  try {
    const { id, prevImgId } = req.query;

    console.log("ID: ",prevImgId);
    const file = req.file;
    let fid;

    if (file) {
      fid = file.id;
    }

    const updatedProfileData = {
      ...req.body,
    };
    
    if (fid) {
      
      updatedProfileData.image = fid;
    }

    // Update the user's profile data
    const user = await User.findByIdAndUpdate({ _id: id }, updatedProfileData, { new: true });

    
    if (fid && prevImgId) {
      deleteImage(prevImgId);
    }

    res.status(200).json({ status: true,user, msg: "Profile Updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

// exports.updateProfileImage = async(req,res)=>{
//    try{
//        const {id,image} = req.body;
//        await User.findByIdAndUpdate({_id:id},{...req.body,image:image},{new:true}).then((user)=>{
//         res.status(200).json({user,status:true,msg:"Profile Updated successfully"})
//        })
//    }
//    catch(err){
    
//       console.error(err);
//       return res.status(500).json({ status: false, msg: "Internal Server Error" });
    
//    }
// }

exports.getProfilePic = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const gfs = await gfsPromise;

    const file = await gfs.find({ _id }).toArray();
    if (!file || file.length === 0) {
      return res.status(400).send('No file exists');
    }

    const readStream = gfs.openDownloadStream(_id);
    readStream.on('error', (err) => {
      console.error(err);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    });

    res.set('Content-Type', file[0].contentType);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
};


// Change password for a vendor
 exports.changePassword = async(req, res, next)=> {
  try {
    const { email, new_password } = req.body;

    // Handle validation errors
    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    // Generate salt for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Find the vendor by vendor_id
    const gamingMerchant = await User.findOne({ email });

    // Update the vendor's password
    gamingMerchant.password = hashedPassword;
    await gamingMerchant.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
}


// Get the profile picture URL for the current vendor
exports.getProfilePicture = async(req, res) =>{
  try {
    const { id } = req.query;
    const _id = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({_id });

    if (user) {
      res.status(200).json({ image: user.image });
    } else {
      res.status(404).json({ message: 'Gaming Merchant not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch profile picture URL.' });
  }
};

exports.changeProfilePicture=async(req, res)=> {
  try {
    const { id } = req.body;
    const _id = new mongoose.Types.ObjectId(id);

    const profilePicture = req.file;

    // Update the vendor's profile image URL in the database
    await User.findOneAndUpdate(
      { _id },
      { image: profilePicture.path }
    );

    res.status(200).json({ message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload profile picture.' });
  }
}