const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("products");
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.body.user },
      { $addToSet: { products: req.body.productId } },
      { new: true, upsert: true }
    );
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
