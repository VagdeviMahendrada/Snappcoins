import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import vendorRouter from "./routes/GV-DetailRouter.js";
import authRouter from "./routes/GV-AuthRouter.js";
import vendorWalletRouter from "./routes/GV-WalletRouter.js";
import snappcoinBankRouter from "./routes/SnappcoinBankRouter.js";
import transactionRouter from "./routes/GV-TransactionRouter.js";
import allocationRouter from "./routes/GV-AllocationRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});

// Routes
app.use("/gaming-vendor", vendorRouter); // Register vendorRouter for handling /vendor routes
app.use("/gaming-vendor-auth", authRouter); // Register authRouter for handling /auth routes
app.use("/gaming-vendor-wallet", vendorWalletRouter); // Register vendorWalletRouter for handling /vendor-wallet routes
app.use("/snappcoin-bank", snappcoinBankRouter); // Register snappcoinBankRouter for handling /snappcoin-bank routes
app.use("/gaming-vendor-transactions", transactionRouter); // Register transactionRouter for handling /transactions routes
app.use("/gaming-vendor-snappcoin-allocations", allocationRouter); // Register allocationRouter for handling /allocations routes
