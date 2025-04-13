const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Creator = require("../models/creatorModel");
const Admin = require("../models/adminModel");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const authenticateCreator = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const creator = await Creator.findById(decoded.id).select("-password");
    if (!creator) return res.status(404).json({ message: "Creator not found" });
    req.user = creator;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    req.user = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  authenticateUser,
  authenticateCreator,
  authenticateAdmin,
};
