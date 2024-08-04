import { GamingVendorTransactionModel } from "../models/GV-TransactionModel.js";
import {
  performTransaction,
  updateTransactionStatus,
} from "../services/GV-PaymentService.js";
import stripe from "stripe";

// Generate a new transaction ID
async function generateTransactionId() {
  try {
    const lastTransaction = await GamingVendorTransactionModel.findOne(
      {},
      { transaction_id: 1 },
      { sort: { transaction_id: -1 } }
    ).exec();

    if (lastTransaction) {
      const lastId = parseInt(lastTransaction.transaction_id.slice(5)); // Extract the numeric part and convert it to an integer
      const nextId = lastId + 1;
      return `T-GV-${nextId.toString().padStart(5, "0")}`; // Increment the ID and format it with leading zeros
    } else {
      return "T-GV-00001"; // If no vendor exists, start with GV001
    }
  } catch (error) {
    throw error;
  }
}

// Get a new transaction ID
async function getNewTransactionId(req, res, next) {
  try {
    const transactionId = await generateTransactionId();
    res.json({ transactionId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add new transaction" });
  }
}

// Add a new transaction
async function addTransaction(req, res, next) {
  try {
    const newTransaction = req.body;
    const transaction = await GamingVendorTransactionModel.create(
      newTransaction
    ); // Create a new transaction using the TransactionModel
    res.json({ transaction }); // Return the newly created transaction
  } catch (error) {
    res.status(500).json({ error: "Failed to add new transaction" });
  }
}

// Search transactions using keywords for a specific vendor
async function searchTransactions(req, res, next) {
  try {
    const { vendorId, keyword } = req.params;
    const transactions = await GamingVendorTransactionModel.find({
      vendor_id: vendorId,
    }); // Find transactions for the specified vendor

    const searchResults = transactions.filter((transaction) => {
      const {
        transaction_id,
        vendor_id,
        vendor_name,
        transaction_date,
        transaction_status,
        snappcoin_count,
      } = transaction;

      // Perform case-insensitive search for transaction ID, date, status, or snappcoin count
      const regex = new RegExp(keyword, "i");
      return (
        regex.test(transaction_id) ||
        regex.test(vendor_id) ||
        regex.test(vendor_name) ||
        regex.test(transaction_date.toString()) ||
        regex.test(transaction_status) ||
        regex.test(snappcoin_count.toString())
      );
    });

    res.json({ searchResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search transactions" });
  }
}

// Get transaction history by vendor
async function getTransactionHistory(req, res, next) {
  try {
    const { vendorId } = req.params;
    console.log(vendorId)
    const transactions = await GamingVendorTransactionModel.find({
      vendor_id: vendorId,
    }).sort({ transaction_date: -1 }); // Retrieve the transaction history for the specified vendor
    console.log("st",transactions,"end")
    res.json({ transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve transaction history" });
  }
}

// Handle Stripe webhook events
async function handleWebhook(req, res) {

  console.log("Entered the handleWebhook function");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const stripeSecretKey = "sk_test_51PKfhFSFREAqfF2GMxke9iJ0SsBGnNTqhrO2Z4gkK20WIvjZPPprgsbzZcAQOCaPCpWtHt3xUmUY41SyPNbiIjOA00rjBPoXhw"
    const stripeClient = stripe(stripeSecretKey);

    event = await stripeClient.webhooks.constructEvent(
      req.rawBody,
      sig,
      "whsec_JswHVWnlfFlcfW0uipy9D474bNh1vyh4"
    );
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return res.status(400).end();
  }

  const paymentIntent = event.data.object;
  const vendor_coins = parseInt(paymentIntent.metadata.vendor_coins);
  const transaction_id = paymentIntent.metadata.transaction_id;
  const vendor_id = paymentIntent.metadata.vendor_id;


  console.log("event",event)
  switch (event.type) {
    // case "payment_intent.canceled":
    //   await updateTransactionStatus(transaction_id, "cancelled");
    //   break;

    // case "payment_intent.payment_failed":
    //   await updateTransactionStatus(transaction_id, "failed");
    //   break;

    case "charge.succeeded":
      await performTransaction(
        vendor_id,
        vendor_coins,
        transaction_id,
        "success"
      );
      break;

    default:
      await updateTransactionStatus(transaction_id, "failed");
  }
  res.json({ received: true });
}

export {
  getNewTransactionId,
  addTransaction,
  searchTransactions,
  getTransactionHistory,
  handleWebhook,
};
