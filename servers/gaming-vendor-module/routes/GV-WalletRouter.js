import express from "express";
import {
  getSnappcoinCounter,
  purchaseSnappcoins,
  createCheckoutSession,
  allocateSnappcoins,
} from "../controllers/GV-WalletController.js";

const router = express.Router();

router.get("/snappcoin-counter/:vendorId", getSnappcoinCounter);
router.post("/snappcoin-purchase", purchaseSnappcoins);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/allocate-snappcoins", allocateSnappcoins);

export default router;
