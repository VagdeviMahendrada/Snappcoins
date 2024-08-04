const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const gamingMerchantSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required:true
  },
    verified: {
      type: Boolean,
      default: false,
    },
    joiningTime: {
      type: Date,
      default: Date.now,
    },
    walletMoney: {
      type: Number,
      default: 0,
    },
    redeemed: {
      type: Number,
      default: 0,
    },
    image: {
      type: String
    },
  },
  { timestamp: true }
);

gamingMerchantSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hash(user.password, 10);
  next();
});

//now create a collection inside the database

const gamingMerchant = new model("gamingMerchant", gamingMerchantSchema);

module.exports = gamingMerchant;
