const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { authenticateAdmin } = require("../middlewares/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Example protected route
// router.get("/dashboard", authenticateAdmin, (req, res) => {
//   res.json({ message: `Welcome Admin ${req.user.name}` });
// });

module.exports = router;
