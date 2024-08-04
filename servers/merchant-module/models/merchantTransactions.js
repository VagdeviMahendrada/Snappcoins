const mongoose = require("mongoose");

const merchantTransactionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gamingMerchant",
        required: true
    },
    gamerId: {
        type: String,
        required: true
    },
    gamerName:{
        type:String,
        required:true
    },
    productId:{
        type: String,
        required: true
    },
    product:{
        type:String,
        required:true
    },
    itemsPurchased:{
        type:Number,
        required:true,
        default:1
    },
    time : { 
        type : Date, 
        default: Date.now 
    },
    snaps:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    image:{
        type:String,
        
    },
    transactionEntry:{
        type:String,
        required:true
    }
}, {
  timestamps: true
});


const merchantTransaction = mongoose.model("merchantTransaction", merchantTransactionSchema);

module.exports = merchantTransaction;