const Video = require('../models/video');
const Creator = require('../models/creator');

const uploadVideo = async (req, res) => {
    try {
      const { title } = req.body;
  
      // Create a new video entry with the uploader's information
      const video = new Video({
          title,
          filename: req.file.filename,
          name: req.user.name,  // Use the name from the authenticated user
          filePath: `/uploads/${req.file.filename}`,
          uploader: req.user._id,
      });
  
      // Save the video in the database
      await video.save();
  
      // Return a success response
      res.status(201).json({ message: 'Video uploaded', video });
    } catch (err) {
      console.error("Error uploading video:", err); // Log error for debugging
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  };
  

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
        .populate('uploader', 'name email')  // pulls in name & email of creator
        .select('title createdAt uploader');
      
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching videos', error: err.message });
    }
  };
  

module.exports = {
  uploadVideo,
  getAllVideos,
};
