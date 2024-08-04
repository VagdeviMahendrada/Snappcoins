import { SnappcoinBankModel } from "../models/SnappcoinBankModel.js";

// Controller function to update the Snappcoin Bank
const updateBank = (req, res) => {
  // Extract the transaction details from the request body
  const {
    transaction_id,
    transaction_status,
    transaction_date,
    user_persona,
    vendor_id,
    vendor_name,
    snappcoins_purchased,
    gamer_id,
    gamer_name,
    merchandise_purchased,
    merchant_id,
    merchant_name,
    snappcoins_redeemed,
  } = req.body;

  console.log(transaction_status)

  // Create a new transaction using the SnappcoinBankModel
  const newTransaction = new SnappcoinBankModel({
    transaction_id,
    transaction_status,
    transaction_date,
    user_persona,
    vendor_id,
    vendor_name,
    snappcoins_purchased,
    gamer_id,
    gamer_name,
    merchandise_purchased,
    merchant_id,
    merchant_name,
    snappcoins_redeemed,
  });

  // Save the transaction to the database
  newTransaction
    .save()
    .then((savedTransaction) => {
      // Transaction saved successfully
      console.log("saved",savedTransaction)
      res.status(201).json(savedTransaction);
    })
    .catch((error) => {
      // Error occurred while saving the transaction
      console.log(error);
      res.status(500).json({ error: "Failed to add transaction" });
    });
};

export { updateBank };
