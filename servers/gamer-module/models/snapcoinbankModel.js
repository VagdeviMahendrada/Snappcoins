const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snapcoinbankSchema = new Schema({
   
    user_persona: {
        type: String,
        required: true,
        enum: ["gaming_vendor", "gamer", "merchant"],
      },
      transaction_id: {
        type: String,
        required: true,
      },
      transaction_status: {
        type: String,
        required: true,
      },
      transaction_date: {
        type: Date,
        required: true,
      },
      // Persona-specific fields
      vendor_id: {
        type: String,
        required: function () {
          return this.user_persona === "gaming_vendor";
        },
      },
      vendor_name: {
        type: String,
        required: function () {
          return this.user_persona === "gaming_vendor";
        },
      },
      snappcoins_purchased: {
        type: Number,
        required: function () {
          return this.user_persona === "gaming_vendor";
        },
      },
      gamer_id: {
        type: String,
        required: function () {
          return this.user_persona === "gamer";
        },
      },
      gamer_name: {
        type: String,
        required: function () {
          return this.user_persona === "gamer";
        },
      },
      merchandise_purchased: {
        type: String,
        required: function () {
          return this.user_persona === "gamer";
        },
      },
      merchant_id: {
        type: String,
        required: function () {
          return this.user_persona === "merchant";
        },
      },
      merchant_name: {
        type: String,
        required: function () {
          return this.user_persona === "merchant";
        },
      },
      snappcoins_redeemed: {
        type: Number,
        required: function () {
          return (
            this.user_persona === "gamer" || this.user_persona === "merchant"
          );
        },
      },
},
{ timestamps: true }

);

const snapcoinbank = new mongoose.model('snapcoinbank',snapcoinbankSchema);

module.exports = snapcoinbank;


