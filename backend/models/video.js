const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    name: { type: String, required: true },
    filePath: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
