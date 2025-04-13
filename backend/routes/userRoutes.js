const express = require("express");

const { authenticateUser } = require("../middlewares/authMiddleware");
const { getUsers,createUser,register, login } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateUser, getUsers);
router.post("/", createUser);

module.exports = router;
