const User = require('../models/gamerModel')
const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');
const bcrypt=require("bcrypt")
const{validationResult}=require("express-validator")
const deleteImage = async(id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  try{
      const gfs = await gfsPromise;
     
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
    return res.status(500).json({ status: false});
  }
}

exports.updateProfile = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(updatedProfileData.password, salt);
    updatedProfileData.password=hashedPassword

    // Find the vendor by vendor_id
    //const gamer = await User.findOne({ id });

    // Update the vendor's password
    //gamer.password = hashedPassword;
   // await vendor.save();


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


// exports.getLocationData = async (req, res) => {
//   const { latitude, longitude } = req.query;
//   const apiKey = 'f4bcb003dd8748e38b42e9da8d97a678'; // Replace with your OpenCage Geocoder API key

//   try {
//     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//     const { results } = response.data;
//     if (results.length > 0) {
//       const firstResult = results[0];
//       const formattedAddress = firstResult.formatted;
//       const country = firstResult.components.country;
//       res.json({ location: formattedAddress, country });
//     } else {
//       res.status(404).json({ error: 'Location not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching data' });
//   }
// };
exports.geolocation = async(req,res) =>{
  const { latitude, longitude } = req.body;
  const API_KEY = "f4bcb003dd8748e38b42e9da8d97a678";
  try{
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);
    const { results } = response.data;
    if (results.length > 0) {
      const firstResult = results[0];
      const formattedAddress = firstResult.formatted;
      const country = firstResult.components.country;
      res.json({ location: formattedAddress, country });
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  }
  catch(err){
    console.error(err);
    return res.status(500).json({status:false,meg:'Internal Server Error'})
  }
}


exports.getAllGamesAndMoneyWon = async(req,res)=> {
  const {id} = req.params
  console.log(id)
  try {
    const gamer = await User.findById({_id:id});
    let gamesList = [];
      gamer.games.forEach(game => {
        gamesList.push({
          name: game.name,
          moneyWon: game.moneyWon
        });
    });
    res.status(200).json({status:true,gamesList,msg:"Records Found"});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({status:false,msg:"Internal Server Error"})
  }
}