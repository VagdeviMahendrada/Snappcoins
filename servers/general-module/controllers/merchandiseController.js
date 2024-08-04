const Merchandise = require('../models/Merchandise')
const mongoose = require('mongoose');
const gfsPromise = require('../config/gridfsDb');
const { parse } = require('dotenv');

exports.getHome  = async (req,res) => {
  try {
    var query = {}
    query.limit = 8
    const merchandises = await Merchandise.find( {},{}, query).sort({featured : -1 ,createdAt : -1 })
    const featured_products = await Merchandise.find({ featured : true })
    res.status(200).json({ merchandises, featured_products,status: true, msg: `Merchandises fetched successfully`})
  }
  catch(err) {
    console.log(err)
  }
}


exports.getMerchandises = async (req, res) => {
  try {
    var { size, pagenum, searchTerm, category , uptoSnapp } = req.query
    let check;
    var query = {}
    query.skip = parseInt(size) * parseInt(pagenum - 1)
    query.limit = parseInt(size)
    var filter_query = { title: { $regex: searchTerm.trim(), $options: 'i' }}
    const h_price = await Merchandise.findOne({}).sort({ price : -1 })
    const l_price = await Merchandise.findOne({}).sort({ price : 1 })
    console.log(h_price)
    console.log(l_price)
    if(uptoSnapp && uptoSnapp != 0){
      filter_query.price = { $lte : uptoSnapp }
    }
    else if(uptoSnapp == 0 && uptoSnapp >= h_price.price){
      filter_query.price = { $lte : h_price.price  }
    }
    else if(uptoSnapp == l_price.price){
      filter_query.price = { $lte : l_price.price }
    }
    if (category && category.length > 0) {
      filter_query.category = { $in: category };
    }
    const merchandises = await Merchandise.find(filter_query, {}, query).sort({ featured : -1 ,createdAt : -1 }).then((data) => {
      return data
    })
    
    
    const count = await Merchandise.count({})
    const search_count = await Merchandise.count(filter_query)
    console.log(category)
    res.status(200).json({ merchandises, status: true, msg: `Merchandises fetched successfully`, total_count: count, search_count: search_count , h_price : h_price.price , l_price : l_price.price })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
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