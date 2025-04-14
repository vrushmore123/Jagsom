const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Creator = require("../models/creatorModel");
const Admin = require("../models/adminModel");

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;  // Attach user data to the request
    next();
  });
};


const authenticateCreator = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const creator = await Creator.findById(decoded.id); // no field restriction here

    if (!creator) return res.status(401).json({ message: 'Unauthorized' });

    req.user = creator; // ✅ This will include name, email, age, etc.
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
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
