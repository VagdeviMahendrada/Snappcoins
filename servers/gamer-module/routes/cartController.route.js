const express = require("express");
const router = express.Router();
const {itemsCollected,itemsDisplay,itemsDelete,itemQuantity} = require("../controllers/cartController");

router.post("/addItem",itemsCollected);
router.get('/showItems',itemsDisplay);
router.post('/deleteItemCart',itemsDelete);
router.post('/quantity',itemQuantity);

module.exports = router;