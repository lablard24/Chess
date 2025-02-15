const express = require("express");
const { addReview, getReviews } = require("../controllers/reviewController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addReview);
router.get("/:productId", getReviews);

module.exports = router;
