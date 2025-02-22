const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ success: false, errors: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: {},
  });

  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ success: false, errors: "Invalid credentials" });
  }

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
};
