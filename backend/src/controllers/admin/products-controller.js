const Product = require("../../models/Product");
const { imageUploadUtil } = require("../../helpers/cloudinary");

exports.handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Received File:", req.file.originalname, req.file.mimetype);

    const uploadResponse = await imageUploadUtil(req.file.buffer, req.file.mimetype);

    if (!uploadResponse.secure_url) {
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }

    res.json({ imageUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;
    if (!name || !image || !category || !new_price || !old_price) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({ id: newId, name, image, category, new_price, old_price });
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
