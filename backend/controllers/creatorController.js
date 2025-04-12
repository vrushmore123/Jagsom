const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Creator = require("../models/creatorModel");


const registerCreator = async (req, res) => {
    const { name, email, password, age, category } = req.body;
  
    try {
      const existing = await Creator.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already exists" });
  
      const newCreator = new Creator({
        name,
        email,
        password, // Let the pre-save hook handle hashing
        age,
        category
      });
  
      await newCreator.save();
      res.status(201).json({ message: "Creator registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };

const loginCreator = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Attempting to login creator with email:', email);
      
      const creator = await Creator.findOne({ email });
      if (!creator) {
        console.log('Creator not found with email:', email);
        return res.status(404).json({ message: "Creator not found" });
      }
  
      console.log('Creator found, comparing passwords...');
      const isMatch = await bcrypt.compare(password, creator.password);
      
      if (!isMatch) {
        console.log('Password comparison failed');
        console.log('Provided password:', password);
        console.log('Stored hash:', creator.password);
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      console.log('Password match successful, generating token...');
      const token = jwt.sign({ id: creator._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      console.log('Login successful, returning response');
      res.status(200).json({
        message: "Login successful",
        token,
        creator: {
          id: creator._id,
          name: creator.name,
          email: creator.email,
          age: creator.age,
          category: creator.category,
        },
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };

module.exports = { registerCreator, loginCreator };
