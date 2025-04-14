const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Creator = require("../models/creatorModel");

// Register a new creator
const registerCreator = async (req, res) => {
  const { name, email, password, age, category, visualPosts = [] } = req.body;

  try {
    const existing = await Creator.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const newCreator = new Creator({
      name,
      email,
      password,
      age,
      category,
      visualPosts,
    });

    await newCreator.save();
    res.status(201).json({ message: "Creator registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const addVisualPost = async (req, res) => {
  const { type, content, mediaUrl } = req.body;
  const creatorId = req.params.id;

  // Basic validation
  if (!type || !content || !mediaUrl) {
    return res.status(400).json({ message: "All fields are required (type, content, mediaUrl)" });
  }

  try {
    const creator = await Creator.findById(creatorId);
    if (!creator) return res.status(404).json({ message: "Creator not found" });

    // Ensure that the logged-in creator is the one trying to modify their own data
    if (creator._id.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const newVisual = { type, content, mediaUrl };
    creator.visualPosts.push(newVisual);
    await creator.save();

    res.status(201).json({ message: "Visual post added", visualPosts: creator.visualPosts });
  } catch (err) {
    console.error(err);  // Log the error for easier debugging
    res.status(500).json({ message: "Failed to add visual", error: err.message });
  }
};

const getVisualPosts = async (req, res) => {
  const creatorId = req.params.id;

  try {
    const creator = await Creator.findById(creatorId).select(
      "name visualPosts"
    );
    if (!creator) return res.status(404).json({ message: "Creator not found" });

    res.status(200).json({
      creatorName: creator.name,
      visualPosts: creator.visualPosts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch visuals", error: err.message });
  }
};



const loginCreator = async (req, res) => {
  const { email, password } = req.body;

  try {
    const creator = await Creator.findOne({ email });
    if (!creator) return res.status(404).json({ message: "Creator not found" });

    const isMatch = await bcrypt.compare(password, creator.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: creator._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      creatorId: creator._id,
      creator: {
        id: creator._id,
        name: creator.name,
        email: creator.email,
        age: creator.age,
        category: creator.category,
        visualPosts: creator.visualPosts || [],
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = {
  registerCreator,
  loginCreator,
  addVisualPost,
  getVisualPosts,
};
