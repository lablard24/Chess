const express = require("express");
const { getProducts, createProduct, deleteProduct } = require("../controllers/productController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts); // ✅ Public Route
router.post("/", authMiddleware, roleMiddleware(["admin"]), createProduct); // ✅ Admin Only
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteProduct); // ✅ Admin Only

module.exports = router;
