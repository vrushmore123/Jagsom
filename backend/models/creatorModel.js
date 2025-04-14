const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const visualPostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Handwritten Letters', 'Live Concerts', 'Poems', 'Photo Shoots', 'Creative Spark'],
      required: true,
    },
    content: { type: String, required: true }, // Can be text, link, description, etc.
    mediaUrl: { type: String }, // Optional media link
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false } // Prevent nested _id fields in subdocuments
);

const creatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Visuals', 'Culture', 'Meeting'],
      default: 'Visuals'
    },
    category: { 
      type: String, 
      required: true, 
      enum: ['Visuals', 'Culture', 'Meeting'],
      default: 'Visuals'
    },
    availableForSupport: {
      type: Boolean,
      default: false,
    },
    supportEmotions: {
      type: [String],
      enum: ['sad', 'anxious', 'angry', 'lonely', 'stressed'],
      default: [],
    },
    availability: [{
      day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
      startTime: String,
      endTime: String,
    }],
    currentStatus: {
      type: String,
      enum: ['online', 'offline', 'in-meeting'],
      default: 'offline'
    },
    upcomingMeetings: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      emotion: String,
      dateTime: Date,
      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      meetLink: String
    }],
    rating: { type: Number, default: 0 },
    supportCount: { type: Number, default: 0 },
  
    visualPosts: [visualPostSchema], // New field for creator’s posts under Visuals
  },
  { timestamps: true }
);

creatorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12); 
  next();
});

module.exports = mongoose.model("Creator", creatorSchema);