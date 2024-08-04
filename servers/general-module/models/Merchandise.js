const mongoose = require("mongoose");

const MerchandiseSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamingMerchant",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },category: {
    type: Array,
    required: true
  },
  count : {
    type : Number,
    required : true,
    default : 0
  },
  image : {
    type : String,
  },
  featured : {
    type : Boolean,
  }
}, {
  timestamps: true
});


const Merchandise = mongoose.model("Merchandise", MerchandiseSchema);

module.exports = Merchandise;