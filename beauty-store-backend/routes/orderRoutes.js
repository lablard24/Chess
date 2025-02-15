const express = require("express");
const { placeOrder, updateOrderStatus } = require("../controllers/orderController"); // Make sure updateOrderStatus exists
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["customer"]), placeOrder);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateOrderStatus); // Ensure this is defined

module.exports = router;
