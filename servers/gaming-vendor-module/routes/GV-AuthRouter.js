import express from "express";
import { check, body } from "express-validator";
import {
  signUp,
  signIn,
  verifyUser,
  registerUser,
  logout,
} from "../controllers/GV-AuthController.js";

const router = express.Router();

// Vendor sign-up
router.post(
  "/signup",
  // [
  //   check("vendor_name")
  //     .notEmpty()
  //     .withMessage("Please enter a name for your company"),
  //   check("vendor_email")
  //     .notEmpty()
  //     .withMessage("Email is required")
  //     .isEmail()
  //     .withMessage("Invalid email"),
  //   check("vendor_password")
  //     .notEmpty()
  //     .withMessage("Password is required")
  //     .isLength({ min: 6 })
  //     .withMessage("Password should be at least 6 characters long")
  //     .matches(/^(?=.*[a-z])/)
  //     .withMessage("Password should contain at least one lowercase letter")
  //     .matches(/^(?=.*[A-Z])/)
  //     .withMessage("Password should contain at least one uppercase letter")
  //     .matches(/^(?=.*\d)/)
  //     .withMessage("Password should contain at least one digit")
  //     .matches(/^(?=.*[@$!%*?&])/)
  //     .withMessage(
  //       "Password should contain at least one special character (@,$,!,%,*,?,&)"
  //     ),
  //   body("vendor_confirm_password")
  //     .notEmpty()
  //     .withMessage("Passwords do not match")
  //     .custom((value, { req }) => {
  //       if (value !== req.body.vendor_password) {
  //         throw new Error("Password confirmation does not match");
  //       }
  //       return true;
  //     }),
  //   check("vendor_website")
  //     .notEmpty()
  //     .withMessage("Enter a link to your company website")
  //     .isURL()
  //     .withMessage("Please enter a valid website URL"),
  // ],
  signUp
);

// Vendor sign-in
router.post("/signin", signIn);

// Register user
router.post("/register-user", registerUser);

// Verify user
router.get("/verify-user", verifyUser);

// Log out user
router.get("/logout", logout);

export default router;
