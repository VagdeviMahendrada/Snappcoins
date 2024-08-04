import mongoose, { Schema } from "mongoose";

// Define the Vendor Transaction schema
const GamingVendorTransactionSchema = new Schema(
  {
    transaction_id: {
      type: String,
      required: true,
      unique: true,
    },
    vendor_id: {
      type: String,
      required: true,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    transaction_date: {
      type: Date,
      required: true,
    },
    transaction_status: {
      type: String,
      required: true,
    },
    snappcoin_count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Vendor Transaction model using the Vendor Transaction schema
const GamingVendorTransactionModel = mongoose.model(
  "gaming_vendor_transactions",
  GamingVendorTransactionSchema
);

// Export the Vendor Transaction model
export { GamingVendorTransactionModel };