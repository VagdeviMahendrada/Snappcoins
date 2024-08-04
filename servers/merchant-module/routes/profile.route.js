const express = require("express");
const router = express.Router();
const  { check, body } =require("express-validator");
const multer =  require("multer");


const { getProfile, updateProfile, getProfilePic,changePassword,updateProfileImage, changeProfilePicture, getProfilePicture, updateProfileNew} = require("../controllers/profileController");
const { verifyToken} = require("../middleware/auth.js");
const { imageMiddleware } = require("../middleware/imageMiddleware");

router.get("/",verifyToken,getProfile)
router.put("/update",verifyToken,imageMiddleware,updateProfile)
router.put("/updatenew",verifyToken,imageMiddleware,updateProfileNew)

router.get('/img/:id',getProfilePic)
// Change password for a vendor
router.post(
    "/change-password",
    [
      check("new_password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters long")
        .matches(/^(?=.*[a-z])/)
        .withMessage("Password should contain at least one lowercase letter")
        .matches(/^(?=.*[A-Z])/)
        .withMessage("Password should contain at least one uppercase letter")
        .matches(/^(?=.*\d)/)
        .withMessage("Password should contain at least one digit")
        .matches(/^(?=.*[@$!%*?&])/)
        .withMessage(
          "Password should contain at least one special character (@,$,!,%,*,?,&)"
        ),
      body("new_password_confirmation")
        .notEmpty()
        .withMessage("Passwords do not match")
        .custom((value, { req }) => {
          if (value !== req.body.new_password) {
            throw new Error("Password confirmation does not match");
          }
          return true;
        }),
    ],
    changePassword
  );

  router.get('/get-profile-picture', getProfilePicture);

//Get the profile picture URL for the current vendor
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

//Change a vendor's profile picture
router.post("/change-profile-picture", upload.single('profilePicture'), changeProfilePicture);
module.exports = router;