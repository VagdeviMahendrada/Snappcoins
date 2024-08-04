const express = require("express");
const { getMerchandises, addMerchandise, updateMerchandise, deleteMerchandise, getMerchandise, getImage } = require("../controllers/merchandiseController");
const { verifyToken } = require("../middleware/auth");
const { imageMiddleware } = require("../middleware/imageMiddleware");
const router = express.Router();

router.get('/getall',verifyToken,getMerchandises)
router.post('/add',verifyToken,imageMiddleware,addMerchandise)
router.put('/update',verifyToken,imageMiddleware,updateMerchandise)
router.delete('/delete',verifyToken,deleteMerchandise)
router.get('/getOne',verifyToken,getMerchandise)
router.get('/img/:id',getImage)

module.exports = router;