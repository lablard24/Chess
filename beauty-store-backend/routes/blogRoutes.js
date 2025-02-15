const express = require("express");
const { getPosts, createPost } = require("../controllers/blogController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, adminMiddleware, createPost);

module.exports = router;
