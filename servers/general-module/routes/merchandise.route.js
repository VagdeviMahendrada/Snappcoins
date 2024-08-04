const express = require("express");
const { getMerchandises, getImage , getHome } = require("../controllers/merchandiseController.js");
const router = express.Router();

router.get('/getall',getMerchandises)
router.get('/img:id',getImage)
router.get("/gethome" ,getHome )

module.exports = router;