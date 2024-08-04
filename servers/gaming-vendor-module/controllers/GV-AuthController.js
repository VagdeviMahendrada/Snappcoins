import { GamingVendorDetailsModel } from "../models/GV-DetailModel.js";
import { GamingVendorWalletModel } from "../models/GV-WalletModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import sendmail from "../services/GV-EmailService.js";
import jwt from "jsonwebtoken";

// Fetch the last assigned vendor ID from the database
async function fetchLastVendorId() {
  try {
    const lastVendor = await GamingVendorDetailsModel.findOne(
      {},
      { vendor_id: 1 },
      { sort: { vendor_id: -1 } }
    );

    if (lastVendor) {
      const lastId = parseInt(lastVendor.vendor_id.slice(2)); // Extract the numeric part and convert it to an integer
      const nextId = lastId + 1;
      return `GV${nextId.toString().padStart(3, "0")}`; // Increment the ID and format it with leading zeros
    } else {
      return "GV001"; // If no vendor exists, start with GV001
    }
  } catch (error) {
    throw error;
  }
}

// Vendor sign-up
async function signUp(req, res, next) {
  try {
    const { vendor_name, vendor_email, vendor_password, vendor_website } =
      req.body;

    // Handle validation errors
    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    // Generate salt for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(vendor_password, salt);

    const vendor_id = await fetchLastVendorId();

    // Create a new vendor with the generated vendor_id and hashed password
    const newVendor = new GamingVendorDetailsModel({
      vendor_id,
      vendor_name,
      vendor_email,
      vendor_password: hashedPassword,
      vendor_website,
    });

    await newVendor.save();

    // Create a new vendor wallet with the vendor_id and initial count of 0
    const newVendorWallet = new GamingVendorWalletModel({
      vendor_id,
      vendor_name,
      vendor_coins: 0,
    });

    // Save the new vendor wallet to the vendor-wallets table
    await newVendorWallet.save();

    const html_text = `<h1>Welcome to Snappcoins!</h1>
        <p>Dear ${vendor_name},</p>
        <p>Congratulations on successfully signing up for Snappcoins!</p>
        <p>Your Vendor ID is: <strong>${vendor_id}</strong></p>
        <p>Please keep this Vendor ID safe, as you will need it to log in to your account.</p>
        <p>Your password is: <strong>${vendor_password}</strong></p>
        <p>We recommend keeping your password confidential and changing it periodically to ensure the security of your account.</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Thank you for choosing Snappcoins!</p>
        <p>Best regards,</p>
        <p>The Snappcoins Team</p>`;

    await sendmail(vendor_email, html_text);

    res.status(200).json({
      success: true,
      message: "Sign-Up successful. Check email for log-in details!",
      vendor_id,
    });
  } catch (error) {
    next(error);
  }
}

// Vendor sign-in
async function signIn(req, res, next) {
  try {
    const { vendor_id, vendor_password } = req.body;

    // Find the vendor by vendor_id
    const vendor = await GamingVendorDetailsModel.findOne({ vendor_id });

    if (!vendor) {
      return res
        .status(401)
        .json({ message: "Vendor does not exist. Create an account first." });
    }

    // Compare the entered password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(
      vendor_password,
      vendor.vendor_password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid vendor credentials" });
    }

    const token = jwt.sign({ vendor_id }, "our-jsonwebtoken-secret-key", {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });

    return res
      .status(200)
      .json({ success: true, message: "Vendor sign-in successful" });
  } catch (error) {
    next(error);
  }
}

// Verify user
async function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Please provide a valid token" });
  } else {
    try {
      const decoded = jwt.verify(token, "our-jsonwebtoken-secret-key");
      const vendor_id = decoded.vendor_id;

      const vendor = await GamingVendorDetailsModel.findOne({ vendor_id });

      if (!vendor) {
        return res.json({ Message: "Vendor not found" });
      }

      if (!vendor.vendor_registration_status) {
        return res.json({ Message: "Vendor registration is not completed" });
      }

      return res.json({ success: true, vendor_id });
    } catch (err) {
      return res.json({ Message: "Authentication Error!" });
    }
  }
}

// Register user
async function registerUser(req, res, next) {
  const { vendorId, vendor_country, vendor_description, vendor_phone } =
    req.body;

  try {
    const vendor = await GamingVendorDetailsModel.findOneAndUpdate(
      { vendor_id: vendorId },
      {
        vendor_country,
        vendor_description,
        vendor_phone,
        vendor_registration_status: true,
      },
      { new: true }
    );

    if (!vendor) {
      console.error("Vendor not found");
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res
      .status(200)
      .json({ message: "Vendor registered successfully. Login using VendorId and Password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Log out user
async function logout(req, res) {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Vendor log-out successful" });
}

export { signUp, signIn, verifyUser, registerUser, logout };
