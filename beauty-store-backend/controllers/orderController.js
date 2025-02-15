const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;

    const order = new Order({ user, items, totalAmount, status: "Processing" });
    await order.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated!", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
