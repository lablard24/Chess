const dotenv = require("dotenv");
const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.set('port', (process.env.PORT || 5001))

dotenv.config();
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/blogs", blogRoutes);


app.get('/', (req, res) => {
  res.send('Beauty Store API Running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

