import mongoose, { Schema } from "mongoose";

// Define the Vendor schema
const GamingVendorDetailsSchema = new Schema(
  {
    vendor_id: {
      type: String,
      required: true,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    vendor_email: {
      type: String,
      required: true,
    },
    vendor_password: {
      type: String,
      required: true,
    },
    vendor_website: {
      type: String,
      required: true,
    },
    vendor_country: {
      type: String,
    },
    vendor_phone: {
      type: String,
    },
    vendor_description: {
      type: String,
    },
    vendor_profile_image_url: {
      type: String,
      default: "../img/default_profile_pic.jpg",
    },
    vendor_registration_status: {
      type: Boolean,
      default: false,
    },
    vendor_account_settings: {
      reminders: {
        type: Boolean,
        default: true,
      },
      promote: {
        type: Boolean,
        default: false,
      },
      profile_temp_disable: {
        type: Boolean,
        default: false,
      },
      newsletter: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

// Create the Vendor model using the Vendor schema
const GamingVendorDetailsModel = mongoose.model(
  "gaming_vendor_details",
  GamingVendorDetailsSchema
);

// Export the Vendor model
export { GamingVendorDetailsModel };
