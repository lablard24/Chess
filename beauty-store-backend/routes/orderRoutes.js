const express = require("express");
const { placeOrder, updateOrderStatus } = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
