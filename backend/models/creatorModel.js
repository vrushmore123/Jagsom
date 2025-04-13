const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const creatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['Visuals', 'Culture', 'Meeting'],  // predefined options for category
      default: 'Visuals'  // Default value if not provided
    },
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
