const express = require("express");
const { registerUser, confirmEmail, loginUser, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/confirm/:token", confirmEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
