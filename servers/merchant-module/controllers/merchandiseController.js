const Merchandise = require('../models/Merchandise')
const merchantTransaction = require('../models/merchantTransactions')
const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');

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

exports.getMerchandises = async(req,res) =>{
    try{
        const {id} = req.query
        const { size, pagenum } = req.query
        // var query = {}
        // query.skip = size * (pagenum - 1)
        // query.limit = size
        const query = {
            userid: id,
          };
        const skip = size * (pagenum - 1);
        const limit = size;
        // const merchandises = await Merchandise.find({userid:id} , {} , query)
        const merchandises = await Merchandise.find(query)
        .sort({ _id: -1 }) // Sorting in reverse order based on _id field
        .skip(skip)
        .limit(limit);
        // const count = await Merchandise.count({userid:id}).then((data) => {
        //     return data
        // })
        const count = await Merchandise.countDocuments(query);
        // console.log(count)
        res.status(200).json({merchandises,status:true,msg:`Merchandises of ${id}` , count : count})
    }catch(err){
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

exports.addMerchandise = async(req,res) =>{
    try{
        //console.log(req.body)
        //console.log(req.file);
        const file = req.file
        let fid;
        if(file) fid = file.id;
        const {id} = req.query
       const newMerchant= await Merchandise.create({userid:id,...req.body,image:fid?fid:""})
       console.log(newMerchant)
        res.status(200).json({status:true,newMerchant,msg:"Merchandise added successfully"})
    }
    catch(err){
        console.error(err,req.file);
        if(req.file == undefined ) return res.status(500).json({ status: false, msg: "Please Upload Image" });
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

exports.updateMerchandise = async(req,res) =>{
    try{
        const {id , prevImgId} = req.query 
        const file = req.file
        let fid;
        if(file) fid = file.id;
        await Merchandise.findByIdAndUpdate({_id:id},{...req.body,image:fid?fid:prevImgId},{new: true })
        if(fid && prevImgId) deleteImage(prevImgId)
        res.status(200).json({status:true,msg:"Merchandise Updated successfully"})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

exports.deleteMerchandise = async(req,res) =>{
    try{
        const {id,imgId} = req.query
        await Merchandise.findByIdAndDelete({_id:id})
        if(imgId) {
            const merchandise = await merchantTransaction.findOne({productId:id}).exec()
            merchandise?"":deleteImage(imgId)
        }
        res.status(200).json({status:true,msg:"Merchandise Deleted successfully"})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    } 
}

exports.getMerchandise = async(req,res) =>{
    try{
        const {id} = req.query
        const merchandise = await Merchandise.find({_id:id})
        res.status(200).json({merchandise,status:true,msg:`Merchandises of ${id}`})
    }catch(err){
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
  
