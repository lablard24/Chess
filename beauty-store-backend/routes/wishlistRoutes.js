const express = require("express");
const { getWishlist, addToWishlist } = require("../controllers/wishlistController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);

module.exports = router;
