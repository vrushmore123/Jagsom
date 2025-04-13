const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = await Admin.create({ name, email, password });
    res.status(201).json({
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      token: generateToken(newAdmin._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering admin", error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
   const admin = await Admin.findOne({ email });
       if (!admin) return res.status(404).json({ message: "Admin not found" });
   
       const isMatch = await bcrypt.compare(password, admin.password);
       if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
