const express = require("express");
const router = express.Router();
const { registerCreator, loginCreator } = require("../controllers/creatorController");
const { authenticateCreator } = require("../middlewares/authMiddleware");

router.post("/register", registerCreator);
router.post("/login", loginCreator);

module.exports = router;
