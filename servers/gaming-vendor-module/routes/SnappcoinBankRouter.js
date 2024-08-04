import express from "express";
import { updateBank } from "../controllers/SnappcoinBankController.js";

const router = express.Router();

// Route to update the Snappcoin Bank
router.post("/update-bank", updateBank);
export default router;
