const express = require("express");
const router = express.Router();
const {
  registerCreator,
  loginCreator,
  addVisualPost,
  getVisualPosts,
} = require("../controllers/creatorController");
const { authenticateCreator } = require("../middlewares/authMiddleware");
const verifyToken = require("../middlewares/token");

router.post("/register", registerCreator);
router.post("/login", loginCreator);
router.post("/:id/visuals", verifyToken, addVisualPost);
router.get("/:id/visuals", getVisualPosts);

module.exports = router;
