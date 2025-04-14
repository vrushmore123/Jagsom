const express = require("express");
const router = express.Router();
const { registerCreator, loginCreator } = require("../controllers/creatorController");
const { authenticateCreator } = require("../middlewares/authMiddleware");
const Creator = require( '../models/creatorModel.js');

router.post("/register", registerCreator);
router.post("/login", loginCreator);

router.get('/profile', async (req, res) => {
    try {
      const creator = await Creator.findById(req.user._id)
        .select('-password');
      res.json(creator);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update availability settings
  router.put('/settings', async (req, res) => {
    try {
      const { availableForSupport, supportEmotions, availability } = req.body;
      
      const updatedCreator = await Creator.findByIdAndUpdate(
        req.user._id,
        { 
          availableForSupport,
          supportEmotions,
          availability,
          currentStatus: availableForSupport ? 'online' : 'offline'
        },
        { new: true }
      ).select('-password');
  
      res.json(updatedCreator);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update current status
  router.put('/status', async (req, res) => {
    try {
      const { status } = req.body;
      const updatedCreator = await Creator.findByIdAndUpdate(
        req.user._id,
        { currentStatus: status },
        { new: true }
      ).select('-password');
      
      res.json(updatedCreator);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


module.exports = router;
