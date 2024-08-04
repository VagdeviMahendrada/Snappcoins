const express = require("express");
const router = express.Router();
const {snappsCollected} = require("../controllers/snappscollectedController");

router.get("/snappscollected",snappsCollected);

module.exports = router;