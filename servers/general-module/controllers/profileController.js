const User = require('../models/gamingMerchantModel')
const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

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