// controllers/visualController.js
const Creator = require("../models/creatorModel");

/**
 * Controller to fetch creators in the "Visuals" category.
 */
exports.getVisualsCreators = async (req, res) => {
  try {
    // Query for creators whose category is "Visuals"
    const creators = await Creator.find({ category: "Visuals" });

    // Map the results to return only the desired fields
    const result = creators.map((creator) => ({
      id: creator._id,
      name: creator.name,
      email: creator.email,
      visualPosts: creator.visualPosts,
      createdAt: creator.createdAt,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching Visuals data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
