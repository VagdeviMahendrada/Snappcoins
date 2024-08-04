const express = require("express");
const router = express.Router();
const {merchantDisplay,getImage} = require("../controllers/merchandiseDisplayControllers");


router.get("/display",merchantDisplay);
router.get('/img/:id',getImage);
module.exports = router;