/*const express = require("express");
const { getProducts, createProduct, deleteProduct } = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;*/

const express = require("express");
const { getProducts, createProduct, deleteProduct } = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts); // ✅ PUBLIC ROUTE (No token needed)
router.post("/", authMiddleware, adminMiddleware, createProduct); // ✅ Admin Only
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct); // ✅ Admin Only

module.exports = router;

