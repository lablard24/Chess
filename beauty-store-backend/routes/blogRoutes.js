const express = require("express");
const { getPosts, createPost } = require("../controllers/blogController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts); // ✅ Public Route
router.post("/", authMiddleware, roleMiddleware(["admin"]), createPost); // ✅ Admin Only

module.exports = router;
