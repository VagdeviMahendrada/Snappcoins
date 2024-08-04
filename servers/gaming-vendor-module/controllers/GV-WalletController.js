import { GamingVendorWalletModel } from "../models/GV-WalletModel.js";
import stripe from "stripe";
import sendmail from "../services/GV-EmailService.js";

// Get the number of Snappcoins a particular vendor has
async function getSnappcoinCounter(req, res, next) {
  try {
    const vendorId = req.params.vendorId;
    const vendorWallet = await GamingVendorWalletModel.findOne({
      vendor_id: vendorId,
    });
    if (!vendorWallet) {
      return res
        .status(401)
        .json({ error: "Vendor does not exist. Check Vendor Id." });
    }

    console.log(vendorWallet)
    // Extract the vendor's name and the number of Snappcoins
    const { vendor_name, vendor_coins } = vendorWallet;

    // Return the vendor's name and the number of coins they have
    res.json({ vendor_name, vendor_coins });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve vendor" });
  }
}

// Purchase tokens and update the count in the vendor's wallet
async function purchaseSnappcoins(req, res, next) {
  try {
    const { vendor_id, tokensToPurchase, paymentStatus } = req.body;

    // Find the vendor's wallet
    const vendorWallet = await GamingVendorWalletModel.findOne({ vendor_id });

    // Check if the payment was successful
    if (paymentStatus !== "success") {
      return res.status(400).json({ error: "Payment failed" });
    }

    if (!vendorWallet) {
      return res
        .status(401)
        .json({ error: "Vendor does not exist. Check Vendor Id." });
    }

    // Update the count by adding the purchased tokens
    vendorWallet.vendor_coins += parseInt(tokensToPurchase);

    // Save the updated vendor wallet
    await vendorWallet.save();

    res.json({ success: true, message: "Snappcoins purchased successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to purchase Snappcoins" });
  }
}

const stripeSecretKey =
  "sk_test_51PKfhFSFREAqfF2GMxke9iJ0SsBGnNTqhrO2Z4gkK20WIvjZPPprgsbzZcAQOCaPCpWtHt3xUmUY41SyPNbiIjOA00rjBPoXhw";
const stripeClient = stripe(stripeSecretKey);

// Create a Stripe checkout session
async function createCheckoutSession(req, res, next) {
  try {
    const {
      snappCoinsToPurchase,
      successUrl,
      failureUrl,
      vendor_id,
      transaction_id,
    } = req.body;

    // Create a new checkout session
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: "price_1PKh3JSFREAqfF2GSTr5yzqG",
          quantity: snappCoinsToPurchase,
        },
      ],
      payment_intent_data: {
        metadata: {
          vendor_id: vendor_id,
          vendor_coins: snappCoinsToPurchase,
          transaction_id: transaction_id,
        },
      },
      mode: "payment",
      success_url: successUrl,
      cancel_url: failureUrl,
    });
    console.log("session",session)
    res.status(200).json({ session: session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}

// Purchase tokens and update the count in the vendor's wallet
async function allocateSnappcoins(req, res, next) {
  try {
    const {
      vendor_id,
      vendor_name,
      vendor_email,
      gamer_id,
      gamer_name,
      tokensToAllocate,
    } = req.body;

    // Find the vendor's wallet
    const vendorWallet = await GamingVendorWalletModel.findOne({ vendor_id });

    if (!vendorWallet) {
      return res
        .status(401)
        .json({ error: "Vendor does not exist. Check Vendor Id." });
    }

    if (tokensToAllocate < vendorWallet.vendor_coins) {
      // Update the count by adding the purchased tokens
      vendorWallet.vendor_coins -= parseInt(tokensToAllocate);

      // Save the updated vendor wallet
      await vendorWallet.save();

      res.json({ success: true, message: "Snappcoins allocated successfully" });
    } else {
      const html_text = `<h1>Welcome to Snappcoins!</h1>
      <p>Dear ${vendor_name},</p>
      <p>We regret to inform you that a player with the following details attempted to add Snappcoins to their wallet, but you currently do not have enough coins available to allocate:</p>
      <p>The player has been allocated ${tokensToAllocate} Snappcoins and your card has been charged accordingly with an additional penalty!</p>
      <p>Please recharge as soon as possible</p>
      <ul>
        <li>Player ID: ${gamer_id}</li>
        <li>Player Name: ${gamer_name}</li>
        <li>Amount Charged: $${tokensToAllocate} + $50 (penalty)</li>
      </ul>
      <p>We apologize for any inconvenience caused. If you have any questions or require further assistance, please don't hesitate to contact our support team.</p>
      <p>Thank you for your understanding.</p>
      <p>Best regards,</p>
      <p>The Snappcoins Team</p>`;
      await sendmail(vendor_email, html_text);
      res.json({
        error:
          "Gaming Vendor does not have enough snappcoins, contact gaming_vendor",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to purchase Snappcoins" });
  }
}

export {
  getSnappcoinCounter,
  purchaseSnappcoins,
  createCheckoutSession,
  allocateSnappcoins,
};
