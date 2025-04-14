const express = require("express");

const { authenticateUser } = require("../middlewares/authMiddleware");
const {
  getUsers,
  createUser,
  register,
  login,
} = require("../controllers/userController");
const { getVisualsCreators } = require("../controllers/visualsController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateUser, getUsers);
router.post("/", createUser);
router.get("/visulas", getVisualsCreators);

module.exports = router;
