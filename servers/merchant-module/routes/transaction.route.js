const express = require("express");
const { gamerCheckout,getTransactions } = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post('/gamerCheckout',gamerCheckout)
router.get('/transactiondetails',verifyToken,getTransactions)

module.exports = router;