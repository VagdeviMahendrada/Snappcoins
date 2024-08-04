import mongoose, { Schema } from "mongoose";

// Define the Vendor Transaction schema
const GVSnappcoinAllocationSchema = new Schema(
  {
    snappcoin_allocation_id: {
      type: String,
      required: true,
      unique: true,
    },
    game_id: {
      type: String,
      required: true,
    },
    game_name: {
      type: String,
      required: true,
    },
    gamer_id: {
      type: String,
      required: true,
    },
    gamer_name: {
      type: String,
      required: true,
    },
    allocation_date: {
      type: Date,
      required: true,
    },
    allocation_status: {
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

// Create the Vendor Snappcoin Allocation model using the Vendor Snappcoin Allocation schema
const GVSnappcoinAllocationModel = mongoose.model(
  "gaming_vendor_snappcoin_allocations",
  GVSnappcoinAllocationSchema
);

// Export the Vendor Transaction model
export { GVSnappcoinAllocationModel };