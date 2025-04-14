const express = require('express');
const upload = require('../middlewares/Upload'); // Import the upload middleware
const { authenticateUser, authenticateCreator } = require('../middlewares/authMiddleware');
const Video = require('../models/video'); // Import the Video model

const router = express.Router();

// Upload route for video
router.post('/upload', authenticateCreator, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      console.log('File uploaded:', req.file); // Log file details for debugging
      console.log('Title:', req.body.title); // Log title details for debugging
  
      const videoData = {
        title: req.body.title, // Title from the form data
        filename: req.file.filename, // File name after upload
        name: req.user.name,
        filePath: `/uploads/${req.file.filename}`, // Path to access the video file
        uploader: req.user._id, // Assuming the creator is authenticated and the user data is attached to req.user
      };
  
      // Store the video in MongoDB
      const newVideo = new Video(videoData);
      await newVideo.save();
  
      res.status(201).json({ message: 'File uploaded successfully', video: newVideo });
    } catch (err) {
      console.error('Error during video upload:', err);
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  });
  

// Get all videos
router.get('/', authenticateUser, async (req, res) => {  // Changed /videos to /
    try {
      const videos = await Video.find().populate('uploader', 'name email');

      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch videos', error: err.message });
    }
});
  
  

module.exports = router;
