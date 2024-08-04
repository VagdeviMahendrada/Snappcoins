const express = require("express");
const router = express.Router();
const { getProfile, getProfilePic } = require("../controllers/profileController");
// const { imageMiddleware } = require("../middleware/imageMiddleware");

router.get('/img:id',getProfilePic)
router.get("/getprofile:id", getProfile)

module.exports = router;