const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transHistorySchema = new Schema({

   user_id:{
     
      type:String
   },

   transactionDate:{
    
     type:Date,
     default:Date.now

   },
    
   transactionId:{
     
     type:String,
     require:true
     
   },
   orderStatus:{

     type:String,
     require:true

   },
   snaps:{
    type:Number,
    default:0
   }
    
},{
    timestamp:true
});

const transHistory = new mongoose.model('GamertransactionHistory',transHistorySchema);

module.exports = transHistory;