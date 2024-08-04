const express = require("express");
const router = express.Router();
const {additem,displayitem} = require("../controllers/transHistoryContollers");


router.post("/addItem",additem);
router.get("/displayItems",displayitem);
module.exports = router;