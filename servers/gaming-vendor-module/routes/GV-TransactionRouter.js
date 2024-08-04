import express from "express";
import {
  getNewTransactionId,
  addTransaction,
  searchTransactions,
  getTransactionHistory,
  handleWebhook,
} from "../controllers/GV-TransactionController.js";

const router = express.Router();

router.get("/get-new-transactionId", getNewTransactionId);
router.post("/add-transaction", addTransaction);
router.get("/search-transactions/:vendorId/:keyword", searchTransactions);
router.get("/history/:vendorId", getTransactionHistory);
router.post("/webhook", handleWebhook);

export default router;
