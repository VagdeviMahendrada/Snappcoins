const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    userId:{
        type: String
    },
    gamerId:{
        type: String
    },
    num_of_tokens:{
        type: Number
    },
    
    
});

const wallet = new mongoose.model('wallet',walletSchema);

module.exports = wallet;