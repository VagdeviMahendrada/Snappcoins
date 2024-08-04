const Merchandise = require("../models/merchandiseDisplayModel");

const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');


exports.merchantDisplay = async (req, res) => {

  const pagenum = req.query.pagenum;
  const size = req.query.size;
  const query = {};
  query.skip = parseInt(size) * parseInt(pagenum - 1)
  query.limit = parseInt(size)

  try {
    const { country } = req.query;
    const filter = {};

    if (country) {
      filter.country = country;
    }

    const merchant = await Merchandise.find({}, {}, query).then((data) => {
      return data;
    });
    const count = await Merchandise.count({});

    res.status(200).send({
      merchant,
      status: true,
      msg: "Products Displayed Successfully",
      total_count: count,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }

}


exports.getImage = async (req, res) => {
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
