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
    visualPosts: [visualPostSchema], // New field for creator’s posts under Visuals
  },
  { timestamps: true }
);

// Hash password before saving
creatorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Creator", creatorSchema);
