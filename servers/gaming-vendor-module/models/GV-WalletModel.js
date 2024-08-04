import mongoose, { Schema } from "mongoose";

// Define the Vendor Wallet schema
const GamingVendorWalletSchema = new Schema(
  {
    vendor_id: {
      type: String,
      required: true,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    vendor_coins: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Vendor Wallet model using the Vendor Wallet schema
const GamingVendorWalletModel = mongoose.model(
  "gaming_vendor_wallet",
  GamingVendorWalletSchema
);

// Export the Vendor Wallet model
export { GamingVendorWalletModel };