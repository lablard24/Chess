const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ errors: "Please authenticate with a valid token" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Invalid Token" });
  }
};

module.exports = authMiddleware;
